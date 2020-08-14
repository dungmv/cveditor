const { DOMParser, XMLSerializer } = require('../libs/xmldom');
const fs = require('fs');

const xml = new DOMParser();
const serializer = new XMLSerializer();

const serialize = (node) => {
    const text = serializer.serializeToString(node);
    return text.replace(/<!--[\s\S]*?-->/g, '') // remove comment
        .replace(/class=/g, 'className=') // fix jsx
        .replace(/contenteditable="true"/g, 'contentEditable={true} suppressContentEditableWarning={true}')
        .replace(/^\s*?$/g, ''); // remove empty line
}

const saveFile = (fileName = '', node) => {
    node.setAttribute('serialize', 'true');
    const text = serialize(node);
    fs.writeFile(`assets/src/${fileName}.html`, text, (err) => {
        if (err) console.warn(err);
        else console.log('serialize', fileName);
    });
}

const removeNote = (parent, node) => {
    node.setAttribute('deleted', 'true');
    parent.removeChild(node);
}

const removeNotes = (parent, nodes) => {
    while(nodes.length > 0) {
        removeNote(parent, nodes[0]);
    }
}

const parser = (html = '') => {
    const doc = xml.parseFromString(html, 'html');
    const container = doc.getElementsByClassName('container')[0];
    const header = container.getElementsByClassName('resume-header')[0];
    const footer = container.getElementsByClassName('resume-footer')[0];
    const columns = container.getElementsByClassName('resume-column');
    for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const sections = col.getElementsByClassName('section');
        for (let j = 0; j < sections.length; j++) {
            const sec = sections[j];
            const subSections = sec.getElementsByClassName('sub-section');
            for (let k = 0; k < subSections.length; k++) {
                const sub = subSections[k];
                saveFile(`sub-${i}-${j}-${k}`, sub);
            }
            removeNotes(sec, subSections);
            saveFile(`sec-${i}-${j}`, sec);
        }
        removeNotes(container, sections);
    }
    removeNote(container, header);
    removeNote(container, footer);
    saveFile('index', container);
    saveFile('header', header);
    saveFile('footer', footer);
}

module.exports = parser;
