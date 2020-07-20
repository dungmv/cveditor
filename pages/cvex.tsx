import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import JsxParser from 'react-jsx-parser'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default ({ data }) => {
    const [template, setTemplate] = useState<string>(null);
    useEffect(() => {
        fetch('/api/templates')
            .then(res => res.text())
            .then(text => setTemplate(text))
    });
    return (
        <div className="container px-3 px-lg-5">
            <DndProvider backend={HTML5Backend}>
                <JsxParser
                    bindings={{}}
                    components={{}}
                    jsx={template}
                />
                {/* {template? <div dangerouslySetInnerHTML={{__html: template}}></div>:null} */}
            </DndProvider>
        </div>
    )
}
