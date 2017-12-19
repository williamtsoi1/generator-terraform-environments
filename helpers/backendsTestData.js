'use strict';

const path = require('path');
const helpers = require('yeoman-test');

exports.s3BackendTestData = () => {
  return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
    environments: '1,2,3',
    components: 'a,b,c',
    backend: 's3',
    provider: 'aws',
    backendBucketName: 'myBucket',
    backendBucketKeyPrefix: 'terraform-remote-state',
    backendBucketRegion: 'ap-southeast-2'
  });
};

exports.consulBackendTestData = () => {
  return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
    environments: '1,2,3',
    components: 'a,b,c',
    backend: 'consul',
    provider: 'aws',
    backendConsulAddress: 'consul',
    backendConsulPathPrefix: 'terraform-remote-state'
  });
};

exports.atlasBackendTestData = () => {
  return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
    environments: '1,2,3',
    components: 'a,b,c',
    backend: 'atlas',
    provider: 'aws',
    backendAtlasOrganisationName: 'myOrg',
    backendAtlasWorkspacePrefix: 'myApp'
  });
};
