# generator-flask-api-generator

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generates controllers, models, validators, and api scaffold for flask python

## Installation

First, install [Yeoman](http://yeoman.io) and generator-flask-api-generator using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-flask-api-generator
```

Then generate your new api endpoint:

```bash
yo flask-api-generator COMMAND FOLDER MODEL TABLE FIELDS
```

### Example

```bash
yo flask-api-generator api . User users 'id:integer,primary,increment|username:string=80,notnull'
```
This generates model, controller and validator for User

"." - represents the current folder as the FOLDER

## License

MIT © [Michael Brucal]() for Wingaru Kids

## Commands

api - generates the controllers, models and validators

model - generates a model

validator - generates a validator

controller - generates a controller on FOLDER/controllers/MODEL_NAME

## Model Fields

| Fields | Description           |
|--------|-----------------------|
| string | creates a db.String   |
| int    | creates a db.Integer  |
| text   | creates a db.Text     |
| bool   | creates a db.Boolean  |
| float  | creates a db.Float    |
| date   | creates a db.DateTime |
| primary | creates a primary_key=True |
| unique | creates a unique=True |
| index | creates an index=True |
| null | creates a nullable=True |
| notnull | creates a nullable=False |
| increment | creates a db.Sequence('VALUE') |
| foreign | creates a db.ForeignKey('VALUE') |
| relationship | creates a db.relationship('VALUE') |
| default | creates a server_default |

## Validator Fields

| Fields   |
|----------|
| min      |
| max      |
| length   |
| equals   |
| anyof    |
| range    |
| required |
| email    |
| url      |
| trim     |

[npm-image]: https://badge.fury.io/js/generator-flask-api-generator.svg
[npm-url]: https://npmjs.org/package/generator-flask-api-generator
[travis-image]: https://travis-ci.org/makarukudo/generator-flask-api-generator.svg?branch=master
[travis-url]: https://travis-ci.org/makarukudo/generator-flask-api-generator
[daviddm-image]: https://david-dm.org/makarukudo/generator-flask-api-generator.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/makarukudo/generator-flask-api-generator
