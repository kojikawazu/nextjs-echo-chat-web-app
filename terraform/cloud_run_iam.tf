# ---------------------------------------------
# IAM role
# ---------------------------------------------
# Google Cloud Run のサービスアカウント
resource "google_service_account" "cloud_run_sa" {
  account_id   = "cloud-run-sa"
  display_name = "Cloud Run Service Account"
}

# Cloud Run のサービスに対する IAM ロール
resource "google_cloud_run_service_iam_member" "invoker" {
  service  = google_cloud_run_service.nextjs_echo_chat_app_service.name
  location = var.gcp_region
  project  = var.gcp_project_id

  role   = var.invoker_role
  member = var.invoker_member
}

