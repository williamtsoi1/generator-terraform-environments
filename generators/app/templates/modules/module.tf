# Make reference other modules here. As a pattern you should not be creating resources directly here.
# Either use a module from the Terraform module registry (https://registry.terraform.io/) or write one yourself

resource "null_resource" "<%= component %>" {
    provisioner "local-exec" {
        command = "echo You are deploying the ${var.component_name} component into the ${var.environment_name} environment!"
    }
}