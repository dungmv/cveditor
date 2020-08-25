const fs = require('fs');
const zlib = require('zlib');
const uuid = require('uuid');
const AdmZip = require('adm-zip');
const parser = require('./cv-parser');
const Template = require('../databases/models/Template');

const get = async (req, res) => {
    templateId = parseInt(req.params.id);
    const template = await Template.findOne({where: {id: templateId}});
    if (!template) {
        res.statusCode = 404;
        res.json({err: 404, msg: 'template not found'});
        return
    }
    zlib.inflate(template.data, (err, result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(result);
    })
}

const create = (req, res) => {
    const type = req.get('Content-Type');
    if (type != 'application/zip') {
        return res.json({ err: 1, msg: type });
    }

    const fileName = `assets/templates/${uuid.v4()}.zip`;
    const ws = fs.createWriteStream(fileName);
    req.pipe(ws).on('close', () => {
        res.json({ err: 0, msg: 'success' });
        const zip = new AdmZip(fileName);
        const zipEntries = zip.getEntries();
        zipEntries.forEach((entry) => {
            const entryName = entry.entryName.toLowerCase();
            if (entryName.startsWith('index')) {
                const jsx = parser(zip.readAsText(entry));
                zlib.deflate(Buffer.from(JSON.stringify(jsx), 'utf8'), (error, result) => {
                    if (error) console.warn('error', error);
                    else Template.create({name: 'cv dev', data: result, src: fileName});
                });
            }
        });
    });
}

module.exports = {
    get,
    create
}
