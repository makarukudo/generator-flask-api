'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

//Split the field string into array
function splitFields($data) {
  let $fieldItems = $data.fields.split('|')
  return $fieldItems.map(function($field) {
    $field = $field.split(':');
    let $fName = $field[0];
    let $fString = $field[1];
    let $schema = createSchema($fString.split(','), $data.table);
    let $validation = createValidation($fString.split(','));
    return {name: $fName, schema: $schema, rules: $validation};
  });
}

module.exports = yeoman.Base.extend({

  // prompting: function() {
  //
  //   return this.prompt([{
  //     type    : 'input',
  //     name    : 'folder',
  //     message : 'Enter folder path:',
  //     default : '.' // Default to current folder name
  //   }, {
  //     type    : 'input',
  //     name    : 'model',
  //     message : 'Enter model name:',
  //     required : true
  //   }, {
  //     type    : 'input',
  //     name    : 'model',
  //     message : 'Enter table name:',
  //     required : true
  //   }, {
  //     type    : 'input',
  //     name    : 'fields',
  //     message : 'Enter field names (ex. username:integer,primary,increment,required|email:string=160,required,email|details:text,null|age:int,default=0)',
  //     required : true
  //     }]).then(function ($answer) {
  //
  //     /**
  //     primary_key
  //     unique
  //     index
  //
  //     db.Column(db.Integer, primary_key=True)
  //     db.ForeignKey('tag.id')
  //     db.relationship('Address', backref='person', lazy='dynamic')
  //     db.relationship('Tag', secondary=tags, backref=db.backref('pages', lazy='dynamic'))
  //     tags = db.Table('tags',
  //         db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
  //         db.Column('page_id', db.Integer, db.ForeignKey('page.id'))
  //     )
  //
  //     Tag.tags.tag_id
  //     Page.pages.page_id
  //     **/
  //
  //     this.answers = $answer;
  //
  //   }.bind(this));
  //
  // },

  writing: function ($command, $folder, $model, $table, $fields) {

    let $answers = { folder: $folder, model: $model, table: $table, fields: $fields }
    $answers.name = {singular: $answers.model.toLowerCase(), plural: $answers.model.toLowerCase() + 's'};
    $answers.model = $answers.model + 'Model';
    $answers.fields = splitFields($answers);
    $answers.createFormFields = createFormFields;
    $answers.createSchemaFields = createSchemaFields;
    $answers.createValidatorFields = createValidatorFields;
    $answers.createSerializeFields = createSerializeFields;
    $answers.createParamFields = createParamFields;
    $answers.createInitFields = createInitFields;
    let path;
    console.log($answers);

    switch($command) {
      case 'api':

        path = ($folder=='.') ? 'controllers/' : $folder + '/controllers/';
        this.fs.copyTpl(
          this.templatePath('controller.py'),
          this.destinationPath(path + $answers.name.plural + '_controller.py'),
          $answers
        );

        this.fs.copy(
          this.templatePath('init.py'),
          this.destinationPath(path + '__init__.py')
        );


//        path = ($folder=='.') ? 'models/' : $folder + '/models/';
        path = 'core/models/';
        this.fs.copyTpl(
          this.templatePath('model.py'),
          this.destinationPath(path + $answers.name.plural + '_model.py'),
          $answers
        );

        this.fs.copy(
          this.templatePath('init.py'),
          this.destinationPath(path + '__init__.py')
        );


        path = ($folder=='.') ? 'validators/' : $folder + '/validators/';
        this.fs.copyTpl(
          this.templatePath('validator.py'),
          this.destinationPath(path + $answers.name.plural + '_validator.py'),
          $answers
        );

        this.fs.copy(
          this.templatePath('init.py'),
          this.destinationPath(path + '__init__.py')
        );

      break;
      case 'model':

        path = ($folder=='.') ? 'models/' : $folder + '/models/';
        this.fs.copyTpl(
          this.templatePath('model.py'),
          this.destinationPath(path + $answers.name.plural + '_model.py'),
          $answers
        );

        this.fs.copy(
          this.templatePath('init.py'),
          this.destinationPath(path + '__init__.py')
        );

      break;
      case 'controller':

        path = ($folder=='.') ? 'controllers/' : $folder + '/controllers/';
        this.fs.copyTpl(
          this.templatePath('controller.py'),
          this.destinationPath(path + $answers.name.plural + '_controller.py'),
          $answers
        );

        this.fs.copy(
          this.templatePath('init.py'),
          this.destinationPath(path + '__init__.py')
        );

      break;
      case 'validator':

        path = ($folder=='.') ? 'validators/' : $folder + '/validators/';
        this.fs.copyTpl(
          this.templatePath('validator.py'),
          this.destinationPath(path + $answers.name.plural + '_validator.py'),
          $answers
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

function createInitFields($fields) {
  return $fields.map(function($field) {
      return "self." + $field.name + " = " + $field.name;
  }).join("\n");
}

function createParamFields($fields) {
  return $fields.map(function($field) {
    return $field.name + " = ''";
  }).join(", ");
}

function createSchemaFields($fields) {
  return $fields.map(function($field) {
      return $field.name + " = db.Column(" + $field.schema.join(", ") + ")";
  }).join("\n");
}

function createSerializeFields($fields) {
  let $html = $fields.map(function($field) {
    return "'" + $field.name + "' : self." + $field.name;
  }).join(",\n");
  return "return {\n" + $html + "\n}";
}

function createValidatorFields($fields) {
  return $fields.map(function($field) {
    return "'" + $field.name + "' : [ " + $field.rules.join(", ") + " ]"
  }).join(", \n");
}

function createFormFields($fields, $prefix) {
  $prefix = (typeof($prefix)!='undefined') ? $prefix + "." : '';
  return $fields.map(function($field) {
    return $prefix + $field.name + " = request.form['" + $field.name + "']";
  });
}

// Integer	an integer
// String (size)	a string with a maximum length
// Text	some longer unicode text
// DateTime	date and time expressed as Python datetime object.
// Float	stores floating point values
// Boolean	stores a boolean value
// PickleType	stores a pickled Python object
// LargeBinary	stores large arbitrary binary data

function createSchema($field, $tableName) {

  return $field.map(function($fk) {
    $fk = $fk.split('=');

    if ($fk.length == 2) {
      switch($fk[0]) {
        case 'string':
          return 'db.String('+ $fk[1] +')'
          break;
        case 'relationship':
          return 'db.relationship("' + $fk[1] + '", backref="' + $tableName + '", lazy="dynamic")';
          break;
        case 'foreign':
          return 'db.ForeignKey("' + $fk[1] + '")';
          break;
        case 'default':
          return 'default="'+ $fk[1] +'"';
          break;
      }
    }

    if ($fk.length == 1) {
      switch($fk[0]) {
        case 'primary':
          return 'primary_key=True';
          break;
        case 'unique':
          return 'unique=True';
          break;
        case 'index':
          return 'index=True';
          break;
        case 'null':
          return 'nullable=True';
          break;
        case 'notnull':
          return 'nullable=False';
          break;
        case 'increment':
          return 'db.Sequence("'+ $tableName +'_id_seq")';
          break;
        case 'int':
          return 'db.Integer';
          break;
        case 'text':
          return 'db.Text';
          break;
        case 'bool':
          return 'db.Boolean';
          break;
        case 'float':
          return 'db.Float';
          break;
        case 'date':
          return 'db.DateTime';
          break;
        case 'string':
          return 'db.String(255)';
          break;
        case 'default':
          return "server_default=db.text(\"''\")";
          break;
      }
    }
  }).filter(function($field) {
    return typeof($field)!='undefined';
  });

}


var $validation = {
  required  : 'validators.DataRequired()',
  email     : 'validators.Email()',
  min       : 'validators.Length(min="$1")',
  max       : 'validators.Length(max="$2")',
  length    : 'validators.Length(min="$1", max="$2")',
  url       : 'validators.URL()',
  equals    : 'validators.EqualTo($1)',
  range     : 'validators.NumberRange(min="$1", max="$2")',
  trim      : 'validators.Optional(strip_whitespace=True)',
  anyof     : 'validators.AnyOf($1)' //separated by /
}


function createValidation($field) {

  return $field.map(function($fk) {
    $fk = $fk.split('=');
    if ($fk.length == 2) {
      let $fn = $fk[0];
      let $fv = $fk[1];

      switch($fn) {
        case 'min':
          return $validation.min.replace('$1', $fv);
          break;
        case 'max':
          return $validation.max.replace('$1', $fv);
          break;
        case 'length':
          $fvs = $fv.split('/');
          return $validation.max.replace('$1', $fvs[0]).replace('$2', $fvs[1]);
          break;
        case 'equals':
          return $validation.equals.replace('$1', $fv);
          break;
        case 'anyof':
          $fvs = $fv.split('/');
          return $validation.anyof.replace('$1', '["' + $fvs.join('","') + '"]');
          break;
        case 'range':
          $fvs = $fv.split('/');
          return $validation.anyof.replace('$1', $fvs[0]).replace('$2', $fvs[1]);
          break;
      }
    }

    if ($fk.length == 1) {
      switch($fk[0]) {
        case 'notnull':
        case 'required':
          return $validation.required;
          break;
        case 'email':
          return $validation.email;
          break;
        case 'url':
          return $validation.url;
          break;
        case 'trim':
          return $validation.trim;
          break;
      }
    }
  }).filter(function($field) {
    return typeof($field)!='undefined';
  });

}
