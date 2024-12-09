
var path = require("path");
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var { window } = new JSDOM("");
var htmlToPdfMake = require("./index.js");
//var util = require("util");

// stream support
const { Readable } = require('stream');
var deasync = require("deasync");


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

var { IMAGES } = require('./example_img_list.js');

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

function _readStream(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}


async function main() {

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
  console.log(dataImages);

  let html_source = `
      Exemplo de PDF com ${IMAGES.length} imagens
  `;

  IMAGES.forEach((_, index) => {
    const imageId = `image_${index + 1}`;
    html_source += `    <img data-image-id="${imageId}" width="640" height="320" />\n`;
  });

  var html = htmlToPdfMake( html_source, {
    dataImages: dataImages,
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

    const initialMemory = process.memoryUsage().heapUsed;
    console.log(`Memória inicial: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`);

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

  console.log('--> example_img_stream2.pdf')


    const finalMemory = process.memoryUsage().heapUsed;
    console.log(`Memória final: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log(
        `Memória máxima usada: ${((finalMemory - initialMemory) / 1024 / 1024).toFixed(2)} MB`
    );


//   pdfDocGenerator.getBuffer(function(buffer) {
//     fs.writeFileSync('example_img_stream2.pdf', buffer);
//     console.log('--> example_img_stream2.pdf')
//   });

}

function base64ToStream(base64) {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}



