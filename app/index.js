'use strict';

const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {

    async prompting() {
        this.answers = await this.prompt([
          {
            type: "input",
            name: "name",
            message: "Your project name",
            default: this.appname // Default to current folder name
          },
          {
            type: "input",
            name: "namespace",
            message: "Your project namespace",
            default: "my.app"
          },       
          {
            type: "input",
            name: "semObject",
            message: "Semantic Object",
            default: "app"
          },
          {
            type: "input",
            name: "semAction",
            message: "Semantic Action",
            default: "display"
          },                          
          {
            type: "input",
            name: "description",
            message: "Project Description",
            default: ""
          },
          {
            type: "input",
            name: "author",
            message: "Author?",
            default: ""
          },          
          {
            type: "input",
            name: "version",
            message: "Your Version",
            default: "1.0.0"
          },
          {
            type: "input",
            name: "version",
            message: "Your Version",
            default: "to_be_replaced"
          },          
          {
            type: 'list',
            name: 'command',
            message: `Post Processing: Build or Install`,
            choices: [
              { name: 'Installation', value: 'inst' },
              { name: 'Build', value: 'build' },
              { name: 'None', value: 'none' },
            ],
            default: 'none'
          }      
        ]);
      }

    async writing() {

      const copyOpts = {
        globOptions: {
          ignore: [],
        },
      }

      this.fs.copyTpl(this.templatePath("**/**"), this.destinationPath(this.answers.name), this.answers, copyOpts);

      const files = [
        //'.gitignore',
        '.eslintignore',
        '.eslintrc.json',
        '.prettierignore',
        '.prettierrc',
        '.babelrc.json',
        '.editorconfig',
      ];         

      files.forEach(f => {
        this.fs.copyTpl(
          this.templatePath(f),
          this.destinationPath(`${this.answers.name}/${f}`),
          this.answers,
          copyOpts
        );
      });
      
    }

    async install() {
      const opt = { "cwd": this.destinationPath(this.answers.name) };
      if (this.answers.command == 'build') {
        console.log('Running Build ... 🖨️');
        this.spawnCommandSync("npm", ["run", "build"], opt);
      } else if (this.answers.command == 'inst') {
        console.log('Running Installation ... 🗄️');
        this.spawnCommandSync("npm", ["run", "inst"], opt);
      } else {
        console.log('No Post Processing ... 🪢');
      }
    }

    async end() {
      console.log('Well done! 🥳🎉');
    }


}