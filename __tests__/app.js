'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-terraform-environments:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      environments: '1,2,3',
      components: 'a,b,c',
      backend: 's3',
      provider: 'aws',
      backendBucketName: 'myBucket',
      backendBucketKeyPrefix: 'terraform-remote-state',
      backendBucketRegion: 'ap-southeast-2'
    });
  });

  it('creates per-environment folders', () => {
    assert.file(['environments']);
    assert.file(['environments/1']);
    assert.file(['environments/1/a']);
    assert.file(['environments/1/b']);
    assert.file(['environments/1/c']);
    assert.file(['environments/2']);
    assert.file(['environments/2/a']);
    assert.file(['environments/2/b']);
    assert.file(['environments/2/c']);
    assert.file(['environments/3']);
    assert.file(['environments/3/a']);
    assert.file(['environments/3/b']);
    assert.file(['environments/3/c']);
  });

  it('creates correct files in an environment', () => {
    assert.file([
      'environments/1/a/a.tf',
      'environments/1/a/terraform.tfvars',
      'environments/1/a/input.tf',
      'environments/1/a/output.tf'
    ]);
  });

  it('creates per-module folders', () => {
    assert.file(['modules/a', 'modules/b', 'modules/c']);
  });

  it('creates correct files in a module', () => {
    assert.file([
      'modules/a/a.tf',
      'modules/a/input.tf',
      'modules/a/output.tf',
      'modules/b/b.tf',
      'modules/b/input.tf',
      'modules/b/output.tf',
      'modules/c/c.tf',
      'modules/c/input.tf',
      'modules/c/output.tf'
    ]);
  });
});
