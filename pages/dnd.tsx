import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container } from '../components/Container'

export default () => {
    return (<div className="container">
        <div className="card">
            <div className="card-body">
                <DndProvider backend={HTML5Backend}>
                    <Container/>
                </DndProvider>
            </div>
        </div>
    </div>)
}
