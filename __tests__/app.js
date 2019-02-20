"use strict";
const assert = require("yeoman-assert");
const backendsTestData = require("../helpers/backendsTestData");

describe("generator-terraform-environments:app", () => {
  describe("basic folder tests", () => {
    beforeAll(() => {
      return backendsTestData.s3BackendTestData();
    });

    it("creates per-environment folders", () => {
      assert.file(["environments"]);
      assert.file(["environments/1"]);
      assert.file(["environments/1/a"]);
      assert.file(["environments/1/b"]);
      assert.file(["environments/1/c"]);
      assert.file(["environments/2"]);
      assert.file(["environments/2/a"]);
      assert.file(["environments/2/b"]);
      assert.file(["environments/2/c"]);
      assert.file(["environments/3"]);
      assert.file(["environments/3/a"]);
      assert.file(["environments/3/b"]);
      assert.file(["environments/3/c"]);
    });

    it("creates correct files in an environment", () => {
      assert.file([
        "environments/1/a/a.tf",
        "environments/1/a/terraform.tfvars",
        "environments/1/a/input.tf",
        "environments/1/a/output.tf"
      ]);
    });

    it("creates per-module folders and files", () => {
      assert.file(["modules/a", "modules/b", "modules/c"]);
      assert.file([
        "modules/a/a.tf",
        "modules/a/input.tf",
        "modules/a/output.tf",
        "modules/b/b.tf",
        "modules/b/input.tf",
        "modules/b/output.tf",
        "modules/c/c.tf",
        "modules/c/input.tf",
        "modules/c/output.tf"
      ]);
    });
  });

  describe("s3 remote backend", () => {
    beforeAll(() => {
      return backendsTestData.s3BackendTestData();
    });

    it("creates the correct s3 backend structure", () => {
      assert.fileContent([
        ["environments/1/a/a.tf", "terraform {"],
        ["environments/1/a/a.tf", 'backend "s3"'],
        ["environments/1/a/a.tf", 'bucket = "myBucket"'],
        [
          "environments/1/a/a.tf",
          'key    = "terraform-remote-state/1/a/terraform.tfstate"'
        ],
        ["environments/1/a/a.tf", 'region = "ap-southeast-2"']
      ]);
    });

    it("creates the correct references to other state files", () => {
      assert.fileContent([
        ["environments/1/a/a.tf", 'data "terraform_remote_state" "b"'],
        ["environments/1/a/a.tf", 'data "terraform_remote_state" "c"']
      ]);
    });

    it("does not create a reference to itself", () => {
      assert.noFileContent([
        ["environments/1/a/a.tf", 'data "terraform_remote_state" "a"'],
        ["environments/1/b/b.tf", 'data "terraform_remote_state" "b"'],
        ["environments/1/c/c.tf", 'data "terraform_remote_state" "c"']
      ]);
    });
  });

  describe("consul remote backend", () => {
    beforeAll(() => {
      return backendsTestData.consulBackendTestData();
    });

    it("creates the correct consul backend structure", () => {
      assert.fileContent([
        ["environments/1/a/a.tf", "terraform {"],
        ["environments/1/a/a.tf", 'backend "consul"'],
        ["environments/1/a/a.tf", 'address      = "consul"'],
        ["environments/1/a/a.tf", 'path         = "terraform-remote-state/1/a"']
      ]);
    });
  });

  describe("atlas remote backend", () => {
    beforeAll(() => {
      return backendsTestData.atlasBackendTestData();
    });

    it("creates the correct atlas backend structure", () => {
      assert.fileContent([
        ["environments/1/a/a.tf", "terraform {"],
        ["environments/1/a/a.tf", 'backend "atlas"'],
        ["environments/1/a/a.tf", 'name         = "myOrg/myApp-1-a"']
      ]);
    });
  });
});
