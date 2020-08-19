import fs from 'fs';
import puppeteer from 'puppeteer';
import CVEditor from '../../components/editor';
import ReactDOMServer from 'react-dom/server';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const readSection = (section: string, childCount: number, id: number) => {
    const jsx = fs.readFileSync(`./assets/src/sec-${section}.html`, 'utf8').toString();
    const subs = [];
    for (let i = 0; i < childCount; i++) {
        subs.push({
            id: i,
            jsx: fs.readFileSync(`./assets/src/sub-${section}-${i}.html`, 'utf8')
        });
    }
    return {id, jsx, subs }
}

export default async (req, res) => {
    const jsx = fs.readFileSync('./assets/src/index.html', 'utf8');
    const header = fs.readFileSync('./assets/src/header.html', 'utf8');
    const footer = fs.readFileSync('./assets/src/footer.html', 'utf8');
    const s11 = readSection('0-0', 6, 1);
    const s12 = readSection('0-1', 3, 2);
    const s21 = readSection('1-0', 2, 3);
    const s22 = readSection('1-1', 2, 4);
    const s23 = readSection('1-2', 2, 5);
    const s24 = readSection('1-3', 2, 6);
    const s25 = readSection('1-4', 0, 7);
    const template = {
        jsx, header, footer,
        sections: [
            [s11, s12],
            [s21, s22, s23, s24, s25],
        ]
    }

    const html = ReactDOMServer.renderToStaticMarkup(
        <DndProvider backend={HTML5Backend}>
            <CVEditor template={template} />
        </DndProvider>
    );

    res.send(html);

    // const browser = await puppeteer.launch({ headless: true });
    // const page = await browser.newPage();
    // await page.setContent(html);
    // const fileContents = await page.pdf({ path: 'template.pdf', format: 'A4' });
    // await browser.close();
    // res.set('Content-disposition', 'attachment; filename=template.pdf');
    // res.set('Content-Type', 'application/pdf');
    // res.send(fileContents);
}
