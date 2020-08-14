const { DOMParser, XMLSerializer } = require('../libs/xmldom');
const fs = require('fs');

const xml = new DOMParser();
const serializer = new XMLSerializer();

const serialize = (node) => {
    const text = serializer.serializeToString(node, true);
    return text.replace(/class=/g, 'className=') // fix jsx
        .replace(/contenteditable="true"/g, 'contentEditable={true} suppressContentEditableWarning={true}');
}

const saveFile = (fileName = '', node) => {
    const text = serialize(node);
    fs.writeFile(`assets/src/${fileName}.html`, text, (err) => {
        if (err) console.warn(err);
        else console.log('serialize', fileName);
    });
}

const removeNote = (node) => {
    parent = node.parentNode;
    parent.removeChild(node);
}

const removeNotes = (parent, nodes, placeholder) => {
    parent.insertBefore(placeholder, nodes[0]);
    for(let i = nodes.length - 1; i >= 0; --i) {
        const node = nodes[i];
        removeNote(node);
    }
}

const parser = (src = '') => {
    //.replace(/\r?\n|\r/gm, '')
    const text = src.replace(/<!--[\s\S]*?-->/g, '').replace(/^\s{2,}|\t/g, '').replace(/\r?\n|\r/gm, '');
    const doc = xml.parseFromString(text, 'html');
    const container = doc.getElementsByClassName('container')[0];
    const header  = container.getElementsByClassName('resume-header')[0];
    const footer = container.getElementsByClassName('resume-footer')[0];
    const columns = container.getElementsByClassName('resume-column');
    for (let i = columns.length - 1; i >= 0; --i) {
        const col = columns[i];
        const sections = col.getElementsByClassName('section');
        for (let j = sections.length - 1; j >= 0; --j) {
            const sec = sections[j];
            const subSections = sec.getElementsByClassName('sub-section');
            for (let k = subSections.length - 1; k >= 0; --k) {
                const sub = subSections[k];
                saveFile(`sub-${i}-${j}-${k}`, sub);
            }
            removeNotes(sec, subSections, doc.createElement('CSubSection'));
            saveFile(`sec-${i}-${j}`, sec);
        }
        const placeholder = doc.createElement('CSection');
        placeholder.setAttribute('col', i);
        removeNotes(container, sections, placeholder);
    }

    container.insertBefore(doc.createElement('CHeader'), header);
    container.insertBefore(doc.createElement('CFooter'), footer);
    removeNote(header);
    removeNote(footer);
    saveFile('index', container);
    saveFile('header', header);
    saveFile('footer', footer);
}

module.exports = parser;
