'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const providers = require('./templates/providers.json');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the slick ' +
          chalk.red('generator-terraform-environments') +
          ' generator!'
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'environments',
        message:
          'What logical environments will you be running (separate multiple responses by comma)?',
        default: 'staging,production',
        store: true
      },
      {
        type: 'input',
        name: 'components',
        message:
          'What components will you be running (separate multiple responses by comma)?',
        default: 'core,compute,data',
        store: true
      },
      {
        type: 'list',
        name: 'backend',
        message:
          'What state backend will you be using? Full list of backends here: https://www.terraform.io/docs/backend/types/index.html',
        choices: ['s3'],
        default: 's3'
      },
      {
        type: 'list',
        name: 'provider',
        message:
          'What Terraform provider will you be using? Full list of providers here: https://www.terraform.io/docs/providers',
        choices: Object.keys(providers)
      },
      {
        when: props => props.backend === 's3',
        type: 'input',
        name: 'backendBucketName',
        message: 'Name of the S3 Bucket for remote state',
        validate: input => input.length > 0
      },
      {
        when: props => props.backend === 's3',
        type: 'input',
        name: 'backendBucketKeyPrefix',
        message: 'The key prefix for the remote state files',
        default: 'terraform-remote-state'
      },
      {
        when: props => props.backend === 's3',
        type: 'input',
        name: 'backendBucketRegion',
        message: 'The AWS region for the S3 Bucket',
        default: 'ap-southeast-2'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    var environments = this.props.environments.split(',');
    var components = this.props.components.split(',');
    for (let component of components) {
      // Creates environment folders
      for (let environment of environments) {
        this.fs.copyTpl(
          this.templatePath('environments/components/component.tf'),
          this.destinationPath(
            `environments/${environment}/${component}/${component}.tf`
          ),
          {
            provider: this.props.provider,
            providerAttributes: providers[this.props.provider],
            appName: this.props.appName,
            backend: this.props.backend,
            backendBucketName: this.props.backendBucketName,
            backendBucketKeyPrefix: this.props.backendBucketKeyPrefix,
            backendBucketRegion: this.props.backendBucketRegion,
            environment: environment,
            component: component,
            components: components
          }
        );
        this.fs.copyTpl(
          this.templatePath('environments/components/terraform.tfvars'),
          this.destinationPath(
            `environments/${environment}/${component}/terraform.tfvars`
          ),
          {
            environment: environment,
            component: component
          }
        );
        this.fs.copy(
          this.templatePath('environments/components/input.tf'),
          this.destinationPath(`environments/${environment}/${component}/input.tf`)
        );
        this.fs.copy(
          this.templatePath('environments/components/output.tf'),
          this.destinationPath(`environments/${environment}/${component}/output.tf`)
        );
      }

      // Creates module folders
      this.fs.copy(
        this.templatePath('modules/input.tf'),
        this.destinationPath(`modules/${component}/input.tf`)
      );
      this.fs.copyTpl(
        this.templatePath('modules/module.tf'),
        this.destinationPath(`modules/${component}/${component}.tf`),
        { component: component }
      );
      this.fs.copy(
        this.templatePath('modules/output.tf'),
        this.destinationPath(`modules/${component}/output.tf`)
      );
    }
  }

  install() {}
};
