const fs = require('fs');
const zlib = require('zlib');
const AdmZip = require('adm-zip');
const parser = require('./cv-parser');
const puppeteer = require('puppeteer');

const readSection = (section, childCount) => {
    const jsx = fs.readFileSync(`./assets/src/sec-${section}.html`, 'utf8');
    const subs = [];
    for (let i = 0; i < childCount; i++) {
        subs.push(fs.readFileSync(`./assets/src/sub-${section}-${i}.html`, 'utf8'))
    }
    return { jsx, subs }
}

const get = (req, res) => {
    const jsx = fs.readFileSync('./assets/src/index.html', 'utf8');
    const header = fs.readFileSync('./assets/src/header.html', 'utf8');
    const footer = fs.readFileSync('./assets/src/footer.html', 'utf8');
    const s11 = readSection('0-0', 6);
    const s12 = readSection('0-1', 3);
    const s21 = readSection('1-0', 2);
    const s22 = readSection('1-1', 2);
    const s23 = readSection('1-2', 2);
    const s24 = readSection('1-3', 2);
    const s25 = readSection('1-4', 0);
    res.statusCode = 200;
    res.json({
        jsx,
        header,
        footer,
        sections: [
            [s11, s12],
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

const download = async (req, res) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const html = fs.readFileSync('./templates/example/index.html');
    await page.setContent(html.toString());
    const fileContents = await page.pdf({ path: 'template.pdf', format: 'A4' });
    await browser.close();

    res.set('Content-disposition', 'attachment; filename=template.pdf');
    res.set('Content-Type', 'application/pdf');
    res.send(fileContents);
}

module.exports = {
    get,
    create,
    download
}
