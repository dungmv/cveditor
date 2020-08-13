const fs = require('fs');
const zlib = require('zlib');
const AdmZip = require('adm-zip');
const parser = require('./cv-parser');

const readSection = (folder, subNumber) => {
    const jsx = fs.readFileSync(`./templates/cv-dev/${folder}/sec.html`, 'utf8');
    const subs = [];
    for (let i = 1; i <= subNumber; i++) {
        subs.push(fs.readFileSync(`./templates/cv-dev/${folder}/sub.${i}.html`, 'utf8'))
    }
    return { jsx, subs }
}

const get = (req, res) => {
    const jsx = fs.readFileSync('./templates/cv-dev/_index.html', 'utf8');
    const header = fs.readFileSync('./templates/cv-dev/_header.html', 'utf8');
    const footer = fs.readFileSync('./templates/cv-dev/_footer.html', 'utf8');
    const s11 = readSection('s.1.1', 6);
    const s12 = readSection('s.1.2', 3);
    const s13 = readSection('s.1.3', 2);
    const s21 = readSection('s.2.1', 2);
    const s22 = readSection('s.2.2', 2);
    const s23 = readSection('s.2.3', 2);
    const s24 = readSection('s.2.4', 2);
    const s25 = readSection('s.2.5', 0);
    res.statusCode = 200;
    res.json({
        jsx,
        header,
        footer,
        sections: [
            [s11, s12, s13],
            [s21, s22, s23, s24, s25],
        ]
    });
}

const create = (req, res) => {
    const type = req.get('Content-Type');
    if (type != 'application/zip') {
        return res.json({err: 1, msg: type});
    }
    const fileName = 'assets/template.zip';
    const ws = fs.createWriteStream(fileName);
    req.pipe(ws).on('close', () => {
        res.json({err: 0, msg: 'success'});
        const zip = new AdmZip(fileName);
        const zipEntries = zip.getEntries();
        zipEntries.forEach((entry) => {
            const entryName = entry.entryName.toLowerCase();
            if (entryName.startsWith('readme')) {
                console.log(zip.readAsText(entry));
            }
            if (entryName.startsWith('index')) {
                parser(zip.readAsText(entry));
            }
        });
    });
}

module.exports = {
    get,
    create,
}
