# ---------------------------------------------
# Variables
# ---------------------------------------------
variable "project" {
  type = string
}

variable "environment" {
  type = string
}

variable "gcp_project_id" {
  type = string
}

variable "gcp_region" {
  type = string
}

variable "repository_id" {
  type = string
}

variable "app_name" {
  type = string
}

variable "http_port" {
  type = number
}

variable "backend_url" {
  type = string
}

variable "service_name" {
  type = string
}

variable "invoker_role" {
  type = string
}

variable "invoker_member" {
  type = string
}

variable "clerk_publishable_key" {
  type = string
}

variable "clerk_secret_key" {
  type = string
}

variable "clerk_sign_in_url" {
  type = string
}

variable "clerk_sign_up_url" {
  type = string
}

variable "clerk_after_sign_in_url" {
  type = string
}

variable "clerk_after_sign_up_url" {
  type = string
}