# ---------------------------------------------
# Cloud Run
# ---------------------------------------------
# Google Cloud Run にデプロイするサaビス
resource "google_cloud_run_service" "nextjs_echo_chat_app_service" {
  name     = var.service_name
  location = var.gcp_region

  metadata {
    namespace = var.gcp_project_id
  }

  template {
    spec {
      containers {
        image = "${var.gcp_region}-docker.pkg.dev/${var.gcp_project_id}/${google_artifact_registry_repository.nextjs_echo_chat_app_repo.repository_id}/${var.app_name}"

        ports {
          container_port = var.http_port
        }
        resources {
          limits = {
            cpu    = "1000m"
            memory = "512Mi"
          }
        }

        env {
          name  = "NEXT_PUBLIC_BACKEND_URL"
          value = var.backend_url
        }
        env {
          name  = "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
          value = var.clerk_publishable_key
        }
        env {
          name  = "NEXT_PUBLIC_CLERK_SIGN_IN_URL"
          value = var.clerk_sign_in_url
        }
        env {
          name  = "NEXT_PUBLIC_CLERK_SIGN_UP_URL"
          value = var.clerk_sign_up_url
        }
        env {
          name  = "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL"
          value = var.clerk_after_sign_in_url
        }
        env {
          name  = "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL"
          value = var.clerk_after_sign_up_url
        }
        env {
          name  = "NEXT_PUBLIC_CLERK_SECRET_KEY"
          value = var.clerk_secret_key
        }
      }
      service_account_name = google_service_account.cloud_run_sa.email
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [
      google_artifact_registry_repository.nextjs_echo_chat_app_repo
  ]
}
