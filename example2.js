
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

var dd = {
    content: [
        'First paragraph',
        'Another paragraph'
    ]
}
var pdfDoc = printer.createPdfKitDocument(dd);
pdfDoc.pipe(fs.createWriteStream('basics.pdf')).on('finish',function(){
    //success
});
pdfDoc.end();