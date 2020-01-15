"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-tiny-compress:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file(["README.md"]);
    assert.file(["package.json"]);
    assert.file(["index.js"]);
    assert.file([".gitignore"]);
  });
});
