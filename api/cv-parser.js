const { DOMParser, XMLSerializer } = require('../libs/xmldom');
const fs = require('fs');

const xml = new DOMParser();
const serializer = new XMLSerializer();

const serialize = (node) => {
    const text = serializer.serializeToString(node, true);
    return text.replace(/class=/g, 'className=') // fix jsx
        .replace(/contenteditable="true"/g, 'contentEditable={true} suppressContentEditableWarning={true}');
}

const removeNote = (node) => {
    parent = node.parentNode;
    parent.removeChild(node);
}

const removeNotes = (nodes, placeholder) => {
    const parent = nodes[0].parentNode;
    parent.insertBefore(placeholder, nodes[0]);
    for(let i = nodes.length - 1; i >= 0; --i) {
        const node = nodes[i];
        removeNote(node);
    }
}

const parserSection = (doc, sec) => {
    const subs = [];
    const subSections = sec.getElementsByClassName('sub-section');
    for (let k = subSections.length - 1; k >= 0; --k) {
        const sub = subSections[k];
        const text = serialize(sub);
        subs.unshift(text);
    }
    removeNotes(subSections, doc.createTextNode('{subSections()}'));
    const jsx = serialize(sec);
    return {subs, jsx}
}

const parser = (src = '') => {
    const template = {sections: [[]], header: '', footer: '', jsx: ''};
    const text = src.replace(/<!--[\s\S]*?-->/g, '').replace(/^\s{2,}|\t/g, '').replace(/\r?\n|\r/gm, '');
    const doc = xml.parseFromString(text, 'html');
    const container = doc.getElementsByClassName('container')[0];
    const header  = container.getElementsByClassName('resume-header')[0];
    const footer = container.getElementsByClassName('resume-footer')[0];
    const columns = container.getElementsByClassName('resume-column');
    const cols = [];
    for (let i = columns.length - 1; i >= 0; --i) {
        const col = columns[i];
        const sections = col.getElementsByClassName('section');
        const secs = [];
        cols.unshift(secs);
        for (let j = sections.length - 1; j >= 0; --j) {
            const sec = parserSection(doc, sections[j]);
            secs.unshift(sec);
        }
        const placeholder = doc.createTextNode(`{column(${i})}`);
        removeNotes(sections, placeholder);
    }

    header.parentNode.insertBefore(doc.createTextNode('{header()}'), header);
    footer.parentNode.insertBefore(doc.createTextNode('{footer()}'), footer);
    removeNote(header);
    removeNote(footer);
    const frame = container.childNodes.length == 1 ? container.firstChild : container;
    template.jsx = serialize(frame);
    template.header = serialize(header);
    template.footer = serialize(footer);
    template.sections = cols;
    return template;
}

module.exports = parser;
