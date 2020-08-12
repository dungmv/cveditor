const { DOMParser, XMLSerializer } = require('xmldom');
const fs = require('fs');
const parse5 = require('parse5');

const domParser = new DOMParser();
const serializer = new XMLSerializer();

const serialize = (node) => {
    const text = serializer.serializeToString(node);
    return text.replace(/<!--[\s\S]*?-->/g, '') // remove comment
                .replace(/class=/g, 'className=') // fix jsx
                .replace(/contenteditable="true"/g, 'contentEditable={true} suppressContentEditableWarning={true}')
                .replace(/^\s*?$/g, ''); // remove empty line
}

const saveFile = (fileName='', node) => {
    const text = serialize(node);
    fs.writeFile(`assets/src/${fileName}.html`, text, (err) => {
        if (err) console.warn(err);
        else console.log('success', fileName);
    });
}

const parser = (html='') => {
    const doc = domParser.parseFromString(html);
    const container = doc.getElementsByClassName('container')[0];
    const header = doc.getElementsByClassName('resume-header')[0];
    const footer = doc.getElementsByClassName('resume-footer')[0];
    const columns = container.getElementsByClassName('resume-column');
    columns.forEach((col, colIndex) => {
        const sections = col.getElementsByClassName('section');
        sections.forEach((sec, secIndex) => {
            saveFile(`sec-${colIndex}-${secIndex}`, sec);
            const subSections = sec.getElementsByClassName('sub-section');
            subSections.forEach((sub, subIndex) => {
                saveFile(`sub-${colIndex}-${secIndex}-${subIndex}`, sub);
            });
        });
    });
    saveFile('index', container);
    saveFile('header', header);
    saveFile('footer', footer);
}

module.exports = parser;
