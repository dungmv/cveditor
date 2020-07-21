import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { Container } from '../components/editor/Container';
import { HTML5Backend } from 'react-dnd-html5-backend'

export default ({ data }) => {
    const [template, setTemplate] = useState(null);
    useEffect(() => {
        fetch('/api/templates')
            .then(res => res.json())
            .then(json => setTemplate(json))
    });
    return (
        <div className="container px-3 px-lg-5">
            <DndProvider backend={HTML5Backend}>
                {template? 
                <Container
                    jsx={template.jsx}
                    header={template.header}
                    footer={template.footer}
                    sections={template.sections}
                /> : null}
            </DndProvider>
        </div>
    )
}
