const fs = require('fs');
const deasync = require('deasync');

// Função que simula síncrono
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

    // Bloqueia até a Promise resolver ou rejeitar
    deasync.loopWhile(() => !done);

    if (error) {
        throw error;
    }
    return result;
}

// Função assíncrona que lê o stream
function _readStream(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

// Exemplo de uso
const stream1 = fs.createReadStream('./10956871.png');
const data = _readStreamSync(stream1);
console.log("all data read!", data.length);

