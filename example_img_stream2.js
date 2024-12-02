
var path = require("path");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var htmlToPdfMake = require("./index.js");
const { Readable } = require('stream');
var deasync = require("deasync");

//var util = require("util");


var fs = require("fs");
var PdfPrinter = require('pdfmake/src/printer');
var fonts = {
    Roboto: {
        normal: 'fonts/Roboto/Roboto-Regular.ttf',
        bold: 'fonts/Roboto/Roboto-Medium.ttf',
        italics: 'fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf'
    }
};
var printer = new PdfPrinter(fonts);


main();


function _readStreamSync(stream) {
	let done = false;
	let result = null;
	let error = null;

	_readStream(stream)
		.then((data) => {
			result = data;
			done = true;
		})
		.catch((err) => {
			error = err;
			done = true;
		});
	deasync.loopWhile(() => !done);
	if (error) {
		throw error;
	}
	return result;
}

function getImageDimensions(stream) {
	let done = false;
	let result = null;
	let error = null;

	_measureStream(stream)
		.then((data) => {
			result = data;
			done = true;
		})
		.catch((err) => {
			error = err;
			done = true;
		});
	deasync.loopWhile(() => !done);
	if (error) {
		throw error;
	}
	return result;
}



function _readStream(stream) {
	return new Promise((resolve, reject) => {
		const chunks = [];
		stream.on('data', (chunk) => chunks.push(chunk));
		stream.on('end', () => resolve(Buffer.concat(chunks)));
		stream.on('error', reject);
	});
}

async function  _measureStream(stream) {
    const chunk = await this._readChunk(stream, 32);
    return this._measureBuffer(chunk);
  }

  function  _readChunk(stream, length) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      let bytesRead = 0;

      stream.on('data', (chunk) => {
        chunks.push(chunk);
        bytesRead += chunk.length;

        if (bytesRead >= length) {
          stream.pause();
          resolve(Buffer.concat(chunks, length));
        }
      });

      stream.on('end', () => reject(new Error('Stream ended before enough data was read')));
      stream.on('error', reject);
    });
  }

  function  _measureBuffer(buffer) {
    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
      return this._measureJPEG(buffer);
    } else if (buffer[0] === 0x89 && buffer.toString('ascii', 1, 4) === 'PNG') {
      return this._measurePNG(buffer);
    } else {
      throw new Error('Unknown image format.');
    }
  }

  function  _measureJPEG(buffer) {
    // JPEG dimensions are stored in SOF (Start of Frame) markers
    let offset = 2; // Skip the first 2 bytes (0xFFD8)
    while (offset < buffer.length) {
      const marker = buffer.readUInt16BE(offset);
      offset += 2;

      if (marker >= 0xffc0 && marker <= 0xffcf && marker !== 0xffc4 && marker !== 0xffcc) {
        const height = buffer.readUInt16BE(offset + 3);
        const width = buffer.readUInt16BE(offset + 5);
        return { width, height };
      } else {
        offset += buffer.readUInt16BE(offset);
      }
    }
    throw new Error('Invalid JPEG format.');
  }

  function  _measurePNG(buffer) {
    // PNG dimensions are in the IHDR chunk, starting at byte 16
    if (buffer.toString('ascii', 12, 16) !== 'IHDR') {
      throw new Error('Invalid PNG format.');
    }
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }


async function main() {

	const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/7QPQUGhvdG9zaG9wIDMuMAA4QklNA+kKUHJpbnQgSW5mbwAAAAB4AAMAAABIAEgAAAAAAtgCKP/h/+IC+QJGA0cFKAP8AAIAAABIAEgAAAAAAtgCKAABAAAAZAAAAAEAAwMDAAAAAScPAAEAAQAAAAAAAAAAAAAAAGAIABkBkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOEJJTQPtClJlc29sdXRpb24AAAAAEAEsAAAAAQABASwAAAABAAE4QklNBA0YRlggR2xvYmFsIExpZ2h0aW5nIEFuZ2xlAAAAAAQAAAAeOEJJTQQZEkZYIEdsb2JhbCBBbHRpdHVkZQAAAAAEAAAAHjhCSU0D8wtQcmludCBGbGFncwAAAAkAAAAAAAAAAAEAOEJJTQQKDkNvcHlyaWdodCBGbGFnAAAAAAEAADhCSU0nEBRKYXBhbmVzZSBQcmludCBGbGFncwAAAAAKAAEAAAAAAAAAAjhCSU0D9RdDb2xvciBIYWxmdG9uZSBTZXR0aW5ncwAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gXQ29sb3IgVHJhbnNmZXIgU2V0dGluZ3MAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0ECAZHdWlkZXMAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4NVVJMIG92ZXJyaWRlcwAAAAQAAAAAOEJJTQQaBlNsaWNlcwAAAABtAAAABgAAAAAAAAAAAAALiAAACMMAAAAGADYAMgAuADYAOAA0AAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAjDAAALiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4QklNBBQXTGF5ZXIgSUQgR2VuZXJhdG9yIEJhc2UAAAAEAAAAAThCSU0EIRpWZXJzaW9uIGNvbXBhdGliaWxp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';

	const dataStreams = {
		stream1: {
			read: function() {
				const dataStream = base64ToStream(base64Image);
				return _readStreamSync(dataStream);
			},
			dimensions: function() {
				const data = this.read();
				return getImageDimensions(data);
			},
		},
		stream2: {
			read: function () {
				return _readStreamSync(fs.createReadStream('./10956871.png'));
			},
			dimensions: function () {
				const data = this.read();
				return getImageDimensions(data);
			},
		},
		stream3: {
			read: function () {
				return _readStreamSync(fs.createReadStream('./IMG_20240108_213702303.jpg'));
			},
			dimensions: function () {
				const data = this.read();
				return getImageDimensions(data);
			},
		},
	};


  html_source = `
    Simple text
    <img src="" data-stream-id="stream1" />
    <img src="" data-stream-id="stream2" />
    <img src="" data-stream-id="stream3" />
    `;

  var html = htmlToPdfMake( html_source, {
    dataStreams: dataStreams,
    window: window, tableAutoSize: true } );
//   console.log(JSON.stringify(html));

  var docDefinition = {
    content: [
      html
    ],
    pageBreakBefore: function(currentNode) {
      // we add a page break before elements with the classname "pdf-pagebreak-before"
      return currentNode.style && currentNode.style.indexOf('pdf-pagebreak-before') > -1;
    },
    styles:{
      red:{
        color:'red'
      },
      blue:{
        color:'blue'
      },
      bold:{
        bold:true
      },
      'html-h6':{
        color:'purple'
      },
      'html-strong':{
        color:'purple'
      },
      'a':{
        bold:true
      },
      'b':{
        italics: true
      },
      'c':{
        color:'red',
        italics: false
      },
      'with-spaces':{
        preserveLeadingSpaces: true
      }
    }
  };

  var pdfDocGenerator = printer.createPdfKitDocument(docDefinition, {
    // see https://pdfmake.github.io/docs/0.1/document-definition-object/tables/
    exampleLayout: {
      hLineColor: function (rowIndex, node, colIndex) {
        if (rowIndex === node.table.body.length) return 'blue';
        return rowIndex <= 1 ? 'red' : '#dddddd';
      },
      vLineColor: function (colIndex, node, rowIndex) {
        if (rowIndex === 0) return 'red';
        return rowIndex > 0 && (colIndex === 0 || colIndex === node.table.body[0].length) ? 'blue' : 'black';
      }
    }
  });

  pdfDocGenerator.pipe(fs.createWriteStream('example_img_stream2.pdf')).on('finish',function(){
	    //success
	});
	pdfDocGenerator.end();

//   pdfDocGenerator.getBuffer(function(buffer) {
//     fs.writeFileSync('example_img_stream2.pdf', buffer);
//     console.log('--> example_img_stream2.pdf')
//   });
  console.log('--> example_img_stream2.pdf')

}

function base64ToStream(base64) {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}