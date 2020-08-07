const fs = require('fs');

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
    res.json({e: 0, msg: 'success'});
}

module.exports = {
    get,
    create,
}
