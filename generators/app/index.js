'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

module.exports = yeoman.Base.extend({
  writing: function (command, folder, name) {
    switch(command) {
      case 'api':
        var path = (folder=='.') ? 'controllers/' : folder + '/controllers/';
        var data = {name: name, name_upper: capitalizeFirstLetter(name), folder: (folder || name)};

        this.fs.copyTpl(
          this.templatePath('controller.py'),
          this.destinationPath(path + name + 's.py'),
          data
        );

        this.fs.copy(
          this.templatePath('init.py'),
          this.destinationPath(path + '__init__.py')
        );

        path = (folder=='.') ? 'models/' : folder + '/models/';
        this.fs.copyTpl(
          this.templatePath('model.py'),
          this.destinationPath(path + name + 's.py'),
          data
        );

        this.fs.copy(
          this.templatePath('init.py'),
          this.destinationPath(path + '__init__.py')
        );

        path = (folder=='.') ? 'validators/' : folder + '/validators/';
        this.fs.copyTpl(
          this.templatePath('validator.py'),
          this.destinationPath(path + name + 's.py'),
          data
        );

        this.fs.copy(
          this.templatePath('init.py'),
          this.destinationPath(path + '__init__.py')
        );

        break;
    }
  },

  install: function () {
    // this.installDependencies();
  }
});
