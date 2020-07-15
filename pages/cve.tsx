import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { H5Editable, PEditable, AEditable } from '../components/index.js'
import { Container } from '../components/Container'

export default () => {
    return (<div className="container">
        <div className="card">
            <div className="card-body">
                <DndProvider backend={HTML5Backend}>
                    {/* <H5Editable className="card-title" value={'Card title'} />
                    <PEditable className="card-text" value="Some quick example text to build on the card title and make up the bulk of the card's content." />
                    <AEditable href="#" className="btn btn-primary" value="Go somewhere" /> */}
                    <Container/>
                </DndProvider>
            </div>
        </div>
    </div>)
}
