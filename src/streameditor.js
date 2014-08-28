#!/usr/bin/env node
var fs     = require('fs');
var stream = require('stream');
var yargs  = require('yargs');

var ProgressBar = require('progress');
var Substitutor = require('./streams/substitutor');





var options = {
  input: {
    alias: 'i',
    required: true,
  },
  output: {
    alias: 'o',
    required: true,
  },
  find: {

  },
  replace: {

  },
  multiline: {
    default: false,
  },
  start: {
    default: 0,
    description: 'Location at which to begin extracting characters',
  },
};





















function edit(input, transforms){
  if (!Array.isArray(transforms)) {
    console.log(wat);
    transforms = [transforms];
  }

  var output = transforms.reduce(function(input, transform){
    return input.pipe(new Substitutor(transform, function(){}));
  }, input);

  return output;
}

module.exports = edit;







if (require.main === module) {
  var argv = yargs.usage('Stream edit file.\nUsage: $0', options).argv;

  var inputStream  = fs.createReadStream(argv.input);
  var outputStream = fs.createWriteStream(argv.output);

  inputStream
    .pipe(edit(argv))
    .pipe(outputStream);
}
