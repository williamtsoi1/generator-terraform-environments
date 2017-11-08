# generator-terraform-environments [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Scaffolding used to create infrastructure environments using Terraform

## Installation

First, install [Yeoman](http://yeoman.io) and generator-terraform-environments using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-terraform-environments
```

Then generate your new project, answering the prompts as required:

```bash
yo terraform-environments
```

## Usage

After creating your scaffolding, you should have a folder structure similar to the following:
```
.
├── environment
│   ├── production
│   │   ├── environment.tf
│   │   ├── terraform.tfvars
│   │   └── variables.tf
│   ├── staging
│   │   ├── environment.tf
│   │   ├── terraform.tfvars
│   │   └── variables.tf
│   ├── test1
│   │   ├── environment.tf
│   │   ├── terraform.tfvars
│   │   └── variables.tf
│   └── test2
│       ├── environment.tf
│       ├── terraform.tfvars
│       └── variables.tf
├── myApp.tf
└── variables.tf
```

To configure your infrastructure deployment:
- Edit `myApp.tf` and add references to other modules that you need for resource creation. As a guideline you shouldn't create resources directly here unless your deployment is very small.
- Edit `variables.tf` and include variables that are needed for the modules called by `myApp.tf`. Supply defaults here if required.

To configure environment-specific variables for the test1 environment (there is a sample variable called `environment_name`):
- Edit `environment/test1/variables.tf` and include variables that are needed for the modules called by `myApp.tf`
- Edit `environment/test1/terraform.tfvars` and supply values here

To deploy the environment into the test1 environment:
```bash
cd ./environment/test1
terraform get
terraform init
terraform apply
```

Once the deployment is successful, you can rinse and repeat for all your other environments.

## License

MIT © [William Tsoi](https://about.me/williamtsoi)


[npm-image]: https://badge.fury.io/js/generator-terraform-environments.svg
[npm-url]: https://npmjs.org/package/generator-terraform-environments
[travis-image]: https://travis-ci.org/williamtsoi1/generator-terraform-environments.svg?branch=master
[travis-url]: https://travis-ci.org/williamtsoi1/generator-terraform-environments
[daviddm-image]: https://david-dm.org/williamtsoi1/generator-terraform-environments.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/williamtsoi1/generator-terraform-environments
[coveralls-image]: https://coveralls.io/repos/williamtsoi1/generator-terraform-environments/badge.svg
[coveralls-url]: https://coveralls.io/r/williamtsoi1/generator-terraform-environments
