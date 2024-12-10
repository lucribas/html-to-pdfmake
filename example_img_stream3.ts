/*
run with

npx ts-node example_img_stream3.ts
*/

import fs from 'fs';
import { Buffer } from 'buffer';

// const htmlToPdfMake = require('html-to-pdfmake');
const htmlToPdfMake = require('./index.js');
const pdfMake = require('pdfmake');
const PdfPrinter = require('pdfmake/src/printer');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM('');

interface IFonts {
  [key: string]: {
    normal: string;
    bold: string;
    italics: string;
    bolditalics: string;
  };
}

const fonts: IFonts = {
  Roboto: {
    normal: 'fonts/Roboto/Roboto-Regular.ttf',
    bold: 'fonts/Roboto/Roboto-Medium.ttf',
    italics: 'fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

const pdfPrinter = new PdfPrinter(fonts);
const readFileSync = (filePath: string): Buffer => fs.readFileSync(filePath);

function createImageFunction(filePath: string): LoadImageInterface {
  let reads = 0;
  return {
    read: (): Buffer => {
      if (reads++ > 1) {
        console.log(`Read same image again x${reads} on read()`);
      }
      return readFileSync(filePath);
    },
  };
}

interface LoadImageInterface {
  read: () => Buffer;
}
const IMAGES: string[] = [
  './imgs/20211019-FanalMadeira_ROW0862209086_UHD.jpg',
  './imgs/20211028-UnkindnessRavens_ROW8093844885_UHD.jpg',
  './imgs/20211121-Invergarry_ROW8999922770_UHD.jpg',
  './imgs/20220224-CrystalCave_ROW2601921907_UHD.jpg',
  './imgs/20220330-TofinoOcean_ROW2686133233_UHD.jpg',
  './imgs/20220728-LongsPeak_PT-BR1847725385_UHD.jpg',
  './imgs/20220811-MtTsubakuro_PT-BR4172492131_UHD.jpg',
  './imgs/20220831-BlueLinckia_PT-BR4801918964_UHD.jpg',
  './imgs/20220920-SitkaOtters_PT-BR8466489649_UHD.jpg',
  './imgs/20221213-InstagramHallstatt_PT-BR7899105457_UHD.jpg',
  './imgs/20230407-KitsAspen_PT-BR8299899730_UHD.jpg',
  './imgs/20230427-SouthPadre_PT-BR5387043078_UHD.jpg',
  './imgs/20230525-SaksunFaroe_PT-BR6443520957_UHD.jpg',
  './imgs/20230621-StonehengeSalisbury_PT-BR7064860081_UHD.jpg',
  './imgs/20230630-ClamBears_PT-BR5661111850_UHD.jpg',
  './imgs/20230801-DenaliClimber_PT-BR1512476985_UHD.jpg',
  './imgs/20230905-MountSegla_PT-BR1076909696_UHD.jpg',
  './imgs/20240808-SpottedOwlet_PT-BR0320206589_UHD.jpg',
  './imgs/20240923-IcebergOtter_PT-BR0553443956_UHD.jpg',
];

async function main(): Promise<void> {
  console.time('time_mark');

  const dataImages = IMAGES.reduce<Map<string, LoadImageInterface>>((map, filePath, index) => {
    const imageKey = `image_${index + 1}`;
    const loadImage = createImageFunction(filePath);
    map.set(imageKey, loadImage);
    return map;
  }, new Map<string, LoadImageInterface>());

  let htmlSource = `Exemplo de PDF com ${IMAGES.length} imagens`;

  IMAGES.forEach((_, index) => {
    const imageId = `image_${index + 1}`;
    htmlSource += `<img data-image-id="${imageId}" width="640" height="320" />\n`;
  });

  console.timeLog('time_mark', 'htmlToPdfMake...');

  const html = htmlToPdfMake(htmlSource, {
    dataImages,
    window,
    tableAutoSize: true,
  });

  const docDefinition = {
    content: [html],
    pageBreakBefore: (currentNode: any): boolean => {
      return currentNode.style && currentNode.style.indexOf('pdf-pagebreak-before') > -1;
    },
    styles: {
      red: {
        color: 'red',
      },
      blue: {
        color: 'blue',
      },
      bold: {
        bold: true,
      },
      'html-h6': {
        color: 'purple',
      },
      'html-strong': {
        color: 'purple',
      },
      a: {
        bold: true,
      },
      b: {
        italics: true,
      },
      c: {
        color: 'red',
        italics: false,
      },
      'with-spaces': {
        preserveLeadingSpaces: true,
      },
    },
  };

  console.timeLog('time_mark', 'start createPdfKitDocument...');

  let lastProgress: string | null = null;
  const progressCallback = (progressData: number): void => {
    const progress = (progressData * 100).toFixed(0);
    if (parseInt(progress) % 10 === 0 && lastProgress !== progress) {
      lastProgress = progress;
      console.log(`Progresso Rendering: ${progress}%`);
    }
  };

  const pdfDoc = await pdfPrinter.createPdfKitDocument(docDefinition, {
    progressCallback,
    bufferPages: false,
    exampleLayout: {
      hLineColor: (rowIndex: number, node: any, colIndex: number): string => {
        if (rowIndex === node.table.body.length) return 'blue';
        return rowIndex <= 1 ? 'red' : '#dddddd';
      },
      vLineColor: (colIndex: number, node: any, rowIndex: number): string => {
        if (rowIndex === 0) return 'red';
        return rowIndex > 0 && (colIndex === 0 || colIndex === node.table.body[0].length) ? 'blue' : 'black';
      },
    },
  });

  console.timeLog('time_mark', 'Open pipe...');

  pdfDoc.pipe(fs.createWriteStream('example_img_stream3.pdf')).on('finish', () => {
    console.timeLog('time_mark', 'pipe finished');
  });

  pdfDoc.end();

  console.timeLog('time_mark', 'end() finished');
}

main().catch(error => console.error(error));
