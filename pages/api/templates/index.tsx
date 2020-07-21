import fs from 'fs';

const readSection = (folder: string, subNumber: number) => {
    const jsx = fs.readFileSync(`./resource/cv-dev/${folder}/sec.html`, 'utf8');
    const subs = [];
    for (let i = 1; i <= subNumber; i++) {
        subs.push(fs.readFileSync(`./resource/cv-dev/${folder}/sub.${i}.html`, 'utf8'))
    }
    return {jsx, subs}
}

export default (req, res) => {
    const jsx = fs.readFileSync('./resource/cv-dev/_index.html', 'utf8');
    const header = fs.readFileSync('./resource/cv-dev/_header.html', 'utf8');
    const footer = fs.readFileSync('./resource/cv-dev/_footer.html', 'utf8');
    const s11 = readSection('s.1.1', 6);
    const s12 = readSection('s.1.2', 3);
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
            [s11, s12],
            [s21, s22, s23, s24, s25],
        ]
    });
}
