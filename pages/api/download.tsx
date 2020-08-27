import zlib from 'zlib';
import puppeteer from 'puppeteer';
import CVEditor from '../../components/editor';
import ReactDOMServer from 'react-dom/server';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Template from '../../databases/models/Template'

export default async (req, res) => {
    const template = await Template.findOne({where: {id: 1}});

    zlib.inflate(template.data, async (err, result) => {
        const jsx = JSON.parse(result.toString('utf8'));
        const html = ReactDOMServer.renderToStaticMarkup(
            <DndProvider backend={HTML5Backend}>
                <CVEditor template={jsx} />
            </DndProvider>
        );

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setContent(html);
        const fileContents = await page.pdf({ format: 'A4' });
        await browser.close();
        res.set('Content-disposition', 'attachment; filename=template.pdf');
        res.set('Content-Type', 'application/pdf');
        res.send(fileContents);
    })
}
