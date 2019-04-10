{% from "metalk8s/map.jinja" import metalk8s with context %}

{% set salt_master_image = 'salt-master' %}
{% set salt_master_version = '2018.3.4-1' %}

{%- from "metalk8s/map.jinja" import networks with context %}

{%- set ip_candidates = salt.network.ip_addrs(cidr=networks.control_plane) %}
{%- if ip_candidates %}
    {%- set salt_api_ip = ip_candidates[0] %}
{%- else %}
    {%- set salt_api_ip = '127.0.0.1' %}
{%- endif %}

Create salt master directories:
  file.directory:
    - user: root
    - group: root
    - mode: '0700'
    - makedirs: true
    - names:
      - /etc/salt
      - /var/cache/salt
      - /var/run/salt

Install and start salt master manifest:
  file.managed:
    - name: /etc/kubernetes/manifests/salt-master-pod.yaml
    - source: salt://metalk8s/salt/master/files/salt-master-pod.yaml.j2
    - template: jinja
    - user: root
    - group: root
    - mode: '0644'
    - makedirs: false
    - backup: false
    - defaults:
        salt_master_image: {{ salt_master_image }}
        salt_master_version: {{ salt_master_version }}
        iso_root_path: {{ metalk8s.iso_root_path }}
        salt_api_ip: "{{ salt_api_ip }}"
    - require:
      - file: Create salt master directories

Make sure salt master container is up:
  module.wait:
    - cri.wait_container:
      - name: salt-master
      - state: running
    - watch:
      - file: Install and start salt master manifest
