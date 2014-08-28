var stream = require('stream');
var util = require('util');
util.inherits(Slicer, stream.Transform);

function Slicer(start, options) {
  stream.Transform.call(this, options);

  this._start = start;

  console.log("Slicing from %d", options.start);

  this._remainder = "";
  this._options = options;
}


Slicer.prototype._transform = function(chunk, _, doneProcessing) {
  // Decode chunk if necessary
  var data = chunk.toString();

  var transformed;
  if (this._options.multiline) {
    data = this._remainder + data;

    var lines = data.split('\n');

    // last line is empty if data ended on newline
    this._remainder = lines.pop();

    transformed = lines
      .map(this._process, this)
      .join('\n');
  } else {
    transformed = this._process(data);
  }

  // Push processed data down pipe
  this.push(transformed);

  // Tick progress bar
  this._tickProgressBar(chunk.length);

  // Signal chunk completion
  doneProcessing();
};

Substitutor.prototype._process = function(data) {
  if (this._slicing) {
    data = data.slice(this._options.start);
  }

  if (this._replacing) {
    data = data.replace(this._from, this._options.replace);
  }

  return data;
};

module.exports = Substitutor;
