import fs from 'fs';
import puppeteer from 'puppeteer';
import CVEditor from '../../components/editor';
import ReactDOMServer from 'react-dom/server';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const readSection = (section, childCount) => {
    const jsx = fs.readFileSync(`./assets/src/sec-${section}.html`, 'utf8').toString();
    const subs = [];
    for (let i = 0; i < childCount; i++) {
        subs.push(fs.readFileSync(`./assets/src/sub-${section}-${i}.html`, 'utf8'))
    }
    return { jsx, subs }
}

export default async (req, res) => {
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
    const template = {
        jsx, header, footer,
        sections: [
            [{id: 1, sec: s11}, {id: 2, sec: s12}],
            [{id: 3, sec: s21}, {id: 4, sec: s22}, {id: 5, sec: s23}, {id: 6, sec: s24}, {id: 7, sec: s25}],
        ]
    }

    const html = ReactDOMServer.renderToStaticMarkup(
        <DndProvider backend={HTML5Backend}>
            <CVEditor template={template} />
        </DndProvider>
    );

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setContent(html);
    const fileContents = await page.pdf({ path: 'template.pdf', format: 'A4' });
    await browser.close();
    res.set('Content-disposition', 'attachment; filename=template.pdf');
    res.set('Content-Type', 'application/pdf');
    res.send(fileContents);
}
