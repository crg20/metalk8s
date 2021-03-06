{%- from "metalk8s/map.jinja" import nginx_ingress with context %}

{%- set private_key_path = "/etc/metalk8s/pki/nginx-ingress/ca.key" %}

include:
  - metalk8s.internal.m2crypto

Create Ingress CA private key:
  x509.private_key_managed:
    - name: {{ private_key_path }}
    - bits: 4096
    - verbose: False
    - user: root
    - group: root
    - mode: 600
    - makedirs: True
    - dir_mode: 755
    - require:
      - metalk8s_package_manager: Install m2crypto
    - unless:
      - test -f "{{ private_key_path }}"

Generate Ingress CA certificate:
  x509.certificate_managed:
    - name: /etc/metalk8s/pki/nginx-ingress/ca.crt
    - signing_private_key: {{ private_key_path }}
    - CN: ingress-ca
    - keyUsage: "critical digitalSignature, keyEncipherment, keyCertSign"
    - basicConstraints: "critical CA:true"
    - days_valid: {{ nginx_ingress.ca.cert.days_valid }}
    - user: root
    - group: root
    - mode: 644
    - makedirs: True
    - dir_mode: 755
    - require:
      - x509: Create Ingress CA private key

Advertise Ingress CA certificate in the mine:
  module.wait:
    - mine.send:
      - ingress_ca_b64
      - mine_function: hashutil.base64_encodefile
      - /etc/metalk8s/pki/nginx-ingress/ca.crt
    - watch:
      - x509: Generate Ingress CA certificate
