
var path = require("path");
var jsdom = require("jsdom");
var htmlToPdfMake = require("./index.js");
var { Readable } = require('stream');
var deasync = require("deasync");
var fs = require("fs");
var PdfPrinter = require('pdfmake/src/printer');

var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var fonts = {
  Roboto: {
    normal: './fonts/Roboto/Roboto-Regular.ttf',
        bold: './fonts/Roboto/Roboto-Medium.ttf',
        italics: './fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: './fonts/Roboto/Roboto-MediumItalic.ttf'
    }
};

var pdfPrinter = new PdfPrinter(fonts);
main();

async function main() {
  console.time("time_mark");

  const docDefinition = {
    pageSize: 'LEGAL',
    pageMargins: [60, 80, 60, 80],
    // header: [{ text: 'Header part' }],
    content: [
      'First paragraph',
      'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
    ],
  };

  console.timeLog("time_mark", 'start createPdfKitDocument...');
  var pdfDoc = await pdfPrinter.createPdfKitDocument(docDefinition, {
    bufferPages: false,
    window,
  });

  console.timeLog("time_mark", 'Open pipe...');
  await pdfDoc.pipe(fs.createWriteStream('example_img_stream3.pdf'));
  console.timeLog("time_mark", 'pipe finished');

  await pdfDoc.end();
  console.timeLog("time_mark", 'end() finished');
}

function base64ToStream(base64) {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}



