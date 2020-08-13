const { DOMParser, XMLSerializer } = require('../libs/xmldom/dom-parser');
const fs = require('fs');
const parse5 = require('parse5');

const xlmparser = new DOMParser();
const serializer = new XMLSerializer();

const serialize = (node) => {
    const text = serializer.serializeToString(node);
    return text.replace(/<!--[\s\S]*?-->/g, '') // remove comment
        .replace(/class=/g, 'className=') // fix jsx
        .replace(/contenteditable="true"/g, 'contentEditable={true} suppressContentEditableWarning={true}')
        .replace(/^\s*?$/g, ''); // remove empty line
}

const saveFile = (fileName = '', node) => {
    const text = serialize(node);
    fs.writeFile(`assets/src/${fileName}.html`, text, (err) => {
        if (err) console.warn(err);
        else console.log('success', fileName);
    });
}

const parser = (html = '') => {
    const doc = xlmparser.parseFromString(html, 'html');
    const container = doc.getElementsByClassName('container')[0];
    const header = container.getElementsByClassName('resume-header')[0];
    const footer = container.getElementsByClassName('resume-footer')[0];
    const columns = container.getElementsByClassName('resume-column');
    for (let i = 0; i < columns.length; i++) {
        let col = columns[i];
        let sections = col.getElementsByClassName('section');
        for (let j = 0; j < sections.length; j++) {
            let sec = sections[j];
            saveFile(`sec-${i}-${j}`, sec);
            const subSections = sec.getElementsByClassName('sub-section');
            for (let k = 0; k < subSections.length; k++) {
                let sub = subSections[k];
                saveFile(`sub-${i}-${j}-${k}`, sub);
            }
        }
    }
    // columns.forEach((col, colIndex) => {
    //     const sections = col.getElementsByClassName('section');
    //     sections.forEach((sec, secIndex) => {
    //         saveFile(`sec-${colIndex}-${secIndex}`, sec);
    //         const subSections = sec.getElementsByClassName('sub-section');
    //         subSections.forEach((sub, subIndex) => {
    //             saveFile(`sub-${colIndex}-${secIndex}-${subIndex}`, sub);
    //         });
    //     });
    // });
    saveFile('index', container);
    saveFile('header', header);
    saveFile('footer', footer);
}

module.exports = parser;
