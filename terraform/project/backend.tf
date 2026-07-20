terraform {
  backend "s3" {
    bucket         = "projectmanager-terraform-state-20260714"
    key            = "projectmanager/dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    use_lockfile    = true
  }
}