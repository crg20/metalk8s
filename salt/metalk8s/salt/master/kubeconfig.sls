{%- from "metalk8s/map.jinja" import kube_api with context %}
{%- from "metalk8s/map.jinja" import kubernetes with context %}

include:
  - metalk8s.internal.m2crypto

Create kubeconfig file for Salt Master:
  metalk8s_kubeconfig.managed:
    - name: /etc/salt/master-kubeconfig.conf
    - ca_server: {{ pillar['metalk8s']['ca']['minion'] }}
    - signing_policy: {{ kube_api.cert.client_signing_policy }}
    - client_cert_info:
        CN: "salt-master-{{ grains.id }}"
        O: "system:masters"
    - apiserver: "https://127.0.0.1:7443"
    - cluster: {{ kubernetes.cluster }}
    - require:
      - metalk8s_package_manager: Install m2crypto
