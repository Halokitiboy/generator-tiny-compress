"use strict";
const fs = require("fs");
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const assets = [".gitignore"];
const tpls = ["README.md", "package.json", "index.js"];
const dirs = ["source", "output"];
module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the epic ${chalk.red("generator-tiny-compress")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "key",
        message: "TinyPNG key",
        default: ""
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath(".gitignorefile"),
      this.destinationPath(".gitignore")
    );

    tpls.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.props
      );
    });
  }

  install() {
    this.installDependencies();
  }

  end() {
    dirs.forEach(item => {
      fs.mkdirSync(this.destinationPath(item));
    });

    this.log(`${chalk.green("创建项目成功")}`);
  }
};
