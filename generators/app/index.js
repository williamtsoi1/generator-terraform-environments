'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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
        name: 'appName',
        message: 'What is the name of your app?',
        default: 'myApp'
      },
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
        name: 'backend',
        message:
          'What state backend will you be using? Full list of backends here: https://www.terraform.io/docs/backend/types/index.html',
        default: 'local'
      },
      {
        type: 'input',
        name: 'provider',
        message:
          'What Terraform provider will you be using? Full list of providers here: https://www.terraform.io/docs/providers',
        default: 'aws'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    var environments = this.props.environments.split(',');
    for (let environment of environments) {
      this.fs.copyTpl(
        this.templatePath('app_environment.tf'),
        this.destinationPath(`environment/${environment}/environment.tf`),
        {
          provider: this.props.provider,
          appName: this.props.appName,
          backend: this.props.backend
        }
      );
      this.fs.copyTpl(
        this.templatePath('app_environment.tfvars'),
        this.destinationPath(`environment/${environment}/terraform.tfvars`),
        {
          environment: environment
        }
      );
      this.fs.copy(
        this.templatePath('variables.tf'),
        this.destinationPath(`environment/${environment}/variables.tf`)
      );
    }
    this.fs.copyTpl(
      this.templatePath('app.tf'),
      this.destinationPath(`${this.props.appName}.tf`),
      {
        appName: this.props.appName
      }
    );
    this.fs.copy(this.templatePath('variables.tf'), this.destinationPath(`variables.tf`));
  }

  install() {}
};
