var fs = require('fs');

var edit = require('./src/streameditor');
var Substitutor = require('./src/streams/substitutor');

var input  = fs.createReadStream("./stoerre_veje_1.5m.txt");
var output = fs.createWriteStream("./roadslarge.csv");



var transforms = [
  { // fix decimal notation
    find: ',',
    replace: '.',
  },
  { // convert tabs to commas
    find: '\t',
    replace: ',',
  },
  { // delete quotation marks
    find: '"',
    replace: '',
  },
  { // remove first char each line
    start: 1,
    multiline: true,
  },
];


if (false) {

var stream = require('stream');

str = new stream.PassThrough();
var transform = transforms[0];
str = str.pipe(new Substitutor(transform, function(){}));
var transform = transforms[1];
str = str.pipe(new Substitutor(transform, function(){}));
var transform = transforms[2];
str = str.pipe(new Substitutor(transform, function(){}));
var transform = transforms[3];
str = str.pipe(new Substitutor(transform, function(){}));
str = str.pipe(output);

input.pipe(str);


} else {

edit(input, transforms)
  .pipe(output);

}
