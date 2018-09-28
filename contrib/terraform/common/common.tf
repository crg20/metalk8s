# Select the local tempdir (by default /tmp), for generating inventory_file
# Could be useful on Windows.
variable "temp_basedir" {
  type    = "string"
  default = "/tmp"
}

# By default, an inventory is locally generated
# (under /tmp/terraform-<random_string>/hosts.ini)
# You can disable this by setting this variable to false.
# Note: terraform output will still have an "inventory_file" set
# even if you set this variable to false.
variable "inventory_deploy" {
  default = true
}

# Select the size in GB of additional storage attached to nodes.
variable "volume_size" {
  type    = "string"
  default = 200
}

# Select the path where to find the public part of the ssh-keypair.
variable "ssh_key_path" {
  type    = "string"
  default = "~/.ssh/id_rsa.pub"
}

# Name of the openstack keypair used to deploy and access VM
variable "ssh_key_name" {
  type    = "string"
  default = "metalk8s"
}

# Control whether or not, deploying the ssh public key.
# Note: deployment will still look for an ssh key named as ${var.ssh_key_name}
# for deploying VM (should be just preprovisionned)
variable "ssh_key_deploy" {
  default = true
}

#
variable "name_prefix" {
  default = "metalk8s"
}

# Choose the number of nodes you want
variable "nodes_count" {
  type    = "string"
  default = 5
}

# Choose the number of etcd you want
variable "etcd_count" {
  type    = "string"
  default = 5
}

# Choose the number of master you want
variable "masters_count" {
  type    = "string"
  default = 3
}

# If false, etcd are colocated on nodes
# If true, gets is own VM
variable "etcd_dedicated" {
  default = true
}

# If false, master are colocated on nodes
# If true, gets is own VM
variable "masters_dedicated" {
  default = false
}

resource "random_string" "inventory_dir" {
  length = 10
  special = false
}

locals {
  inventory_file = "${var.temp_basedir}/terraform-${random_string.inventory_dir.result}/hosts.ini"
}

output "inventory_file" {
  value = "${local.inventory_file}"
}

output "ssh_key_path" {
  value = "${var.ssh_key_path}"
}

output "volume_size" {
  value = "${var.volume_size}"
}


locals {
  nodes_server_count   = "${var.nodes_count}"
  etcd_server_count    = "${var.etcd_dedicated ?
        var.etcd_count :
        max(0, var.etcd_count - var.nodes_count)}"
  masters_server_count = "${var.masters_dedicated ?
        var.masters_count :
        max(0, var.masters_count - var.etcd_count)}"
}

output "nodes_server_count" {
  value = "${local.nodes_server_count}"
}

output "etcd_server_count" {
  value = "${local.etcd_server_count}"
}

output "masters_server_count" {
  value = "${local.masters_server_count}"
}
