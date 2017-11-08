'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-terraform-environments:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      appName: 'myCoolApp',
      environments: '1,2,3,4,5',
      backend: 's3',
      provider: 'aws'
    });
  });

  it('creates base tf files', () => {
    assert.file(['myCoolApp.tf', 'variables.tf']);
  });

  it('creates per-environment folders', () => {
    assert.file(['environment']);
    assert.file(['environment/1']);
    assert.file(['environment/2']);
    assert.file(['environment/3']);
    assert.file(['environment/4']);
    assert.file(['environment/5']);
  });

  it('creates correct files in an environment', () => {
    assert.file([
      'environment/1/environment.tf',
      'environment/1/terraform.tfvars',
      'environment/1/variables.tf'
    ]);
  });
});
