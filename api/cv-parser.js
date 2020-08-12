const { DOMParser } = require('xmldom');
const fs = require('fs');
const parse5 = require('parse5');
const xmlser = require('xmlserializer');

const serialize = (node) => {
    const text = node.toString();
    return text.replace(/<!--[\s\S]*?-->/g, '')
                .replace(/ class=/g, ' className=')
                .replace(/^\s*?$/g, '');
}

const saveFile = (fileName='', node) => {
    const text = serialize(node);
    fs.writeFile(`assets/src/${fileName}.html`, text, (err) => {
        if (err) console.warn(err);
        else console.log('success', fileName);
    });
}

const parser = (html='') => {
    const doc = new DOMParser().parseFromString(html);
    const container = doc.getElementsByClassName('container')[0];
    const header = doc.getElementsByClassName('resume-header')[0];
    const footer = doc.getElementsByClassName('resume-footer')[0];
    saveFile('index', container);
    saveFile('header', header);
    saveFile('footer', footer);
}

module.exports = parser;
