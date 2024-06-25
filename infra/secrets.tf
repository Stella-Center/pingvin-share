resource "aws_secretsmanager_secret" "mixpanel_token" {
  description = "Mixpanel token"
  name = "${module.label.id}-mixpanel-token"
}