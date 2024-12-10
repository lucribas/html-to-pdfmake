
var path = require("path");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var htmlToPdfMake = require("./index.js");
const { Readable } = require('stream');
var deasync = require("deasync");
var fs = require("fs");
var PdfPrinter = require('pdfmake/src/printer');
var fonts = {
  Roboto: {
    normal: './fonts/Roboto/Roboto-Regular.ttf',
        bold: './fonts/Roboto/Roboto-Medium.ttf',
        italics: './fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: './fonts/Roboto/Roboto-MediumItalic.ttf'
    }
};
var pdfPrinter = new PdfPrinter(fonts);
var { IMAGES } = require('./example_img_list_full.js');

main();

async function main() {
  console.time("time_mark");
  const _readSync = (filePath) => fs.readFileSync(filePath);
  // const _readSync = (filePath) => _readStreamSync(fs.createReadStream(filePath));

  const createImageFunction = (filePath) => {
    let reads = 0;
    return {
      read: function () {
      if (reads++>1) { console.log(`Read same image again x"${reads}" on read()`);  }
      return _readSync(filePath);
      },
    };
  };

  const dataImages = IMAGES.reduce((dataImages, filePath, index) => {
  dataImages[`image_${index + 1}`] = createImageFunction(filePath);
      return dataImages;
  }, {});

  let html_source = `
      Exemplo de PDF com ${IMAGES.length} imagens
  `;

  IMAGES.forEach((_, index) => {
    const imageId = `image_${index + 1}`;
    html_source += `    <img data-image-id="${imageId}" width="640" height="320" />\n`;
  });

  console.timeLog("time_mark, 'htmlToPdfMake...");
  var html = htmlToPdfMake( html_source, {
    dataImages: dataImages,
    window: window, tableAutoSize: true } );

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
 console.timeLog("time_mark", 'start createPdfKitDocument...');

 let lastProgress = null;
 progressCallback = function(progressData) {
  progress = (progressData*100).toFixed(0);
  if ((progress % 10 == 0) && (lastProgress != progress)) {
    lastProgress = progress;
    console.log(`Progresso Rendering: ${progress}%`);
  }
 }

 var pdfDoc = await pdfPrinter.createPdfKitDocument(docDefinition, {
    progressCallback: progressCallback,
    bufferPages: false,
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

  console.timeLog("time_mark", 'Open pipe...');
  await pdfDoc.pipe(fs.createWriteStream('example_img_stream3.pdf')).on('finish',function(){
    console.timeLog("time_mark", 'pipe finished');
  });
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



