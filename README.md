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
├── environments
│   ├── production
│   │   ├── compute
│   │   │   ├── compute.tf
│   │   │   ├── input.tf
│   │   │   ├── output.tf
│   │   │   └── terraform.tfvars
│   │   ├── core
│   │   │   ├── core.tf
│   │   │   ├── input.tf
│   │   │   ├── output.tf
│   │   │   └── terraform.tfvars
│   │   └── data
│   │       ├── data.tf
│   │       ├── input.tf
│   │       ├── output.tf
│   │       └── terraform.tfvars
│   └── test
│       ├── compute
│       │   ├── compute.tf
│       │   ├── input.tf
│       │   ├── output.tf
│       │   └── terraform.tfvars
│       ├── core
│       │   ├── core.tf
│       │   ├── input.tf
│       │   ├── output.tf
│       │   └── terraform.tfvars
│       └── data
│           ├── data.tf
│           ├── input.tf
│           ├── output.tf
│           └── terraform.tfvars
└── modules
    ├── compute
    │   ├── compute.tf
    │   ├── input.tf
    │   └── output.tf
    ├── core
    │   ├── core.tf
    │   ├── input.tf
    │   └── output.tf
    └── data
        ├── data.tf
        ├── input.tf
        └── output.tf
```

The above example assumes that there are two environments (`production` and `test`), as well as three separate components (`core`, `compute` and `data`)

To configure your component modules:

- Edit `modules/<component>/<component>.tf` and add terraform resources, or references to other modules that you need.
- Edit `modules/<component>/input.tf` and add input parameters that the component module requires.
- Edit `modules/<component>/output.tf` and add output parameters that are used by other component modules.

To configure your environments:

- Edit `environment/<environment>/<component>/input.tf` and add input parameters required by the component module
- Edit `environment/<environment>/<component>/terraform.tfvars` and supply values here
- Edit `environment/<environment>/<component>/output.tf` and add output parameters that are used by other component modules.

To deploy the core component into the test environment:

```bash
cd ./environments/test/core
terraform init
terraform apply
```

Once the deployment is successful, you can rinse and repeat for all your other environments.

## Remote State Backends

Currently this code generator supports the following remote state backends:

- s3
- consul

### s3

For the s3 backend, you will be asked for the bucket name, a key prefix, as well as the AWS region for the bucket. The key prefix is especially useful if you have to share this bucket with other apps so the state files can be segregated off.

As a pattern, the state files will be stored in ```s3://<bucket_name>/<key_prefix>/<environment>/<component>/terraform.tfstate```

Note: This code generator will not actually create the s3 bucket for you, and you will also need to provision permissions for the s3 bucket (via bucket policies and IAM users/roles) yourself.

### Consul

For the consul backend, you will be asked for the consul address (defaults to localhost:8500), as well as the key prefix. The key prefix is especially useful if you have to share the Consul key-value store with other apps so the state files can be segregated off.

As a pattern, the state will be stored in key ```<key_prefix>/<environment>/<component>```

Note: This code generator will not manage permissions such as authentication keys, nor ACLs. You will need to manage and provision the appropriate ACLs yourself.

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
