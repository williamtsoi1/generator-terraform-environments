# Complete your provider information here
# Full list of providers: https://www.terraform.io/docs/providers/index.html
provider "<%= provider %>" {
    # provider parameters here
}

# Make a single call to the application module in the root of this repo. 
# Do not create any resources nor reference other modules here. 
# That belongs in ../../<%= appName %>.tf
module "<%= appName %>" {
    source = "../../"
    # other variables to be passed in go here
    environment_name = "${var.environment_name}"
}

# Configure your backend here
# Full list of backends: https://www.terraform.io/docs/backends/index.html
terraform {
    backend "<%= backend %>" {
        # backend parameters here
    }
}