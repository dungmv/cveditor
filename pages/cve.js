import React from 'react';
import { H5Editable, PEditable, AEditable } from '../components/index.js'

export default () => {
    return (<div className="container">
        <div className="card">
            <div className="card-body">
                <H5Editable className="card-title" value={'Card title'} />
                <PEditable className="card-text" value="Some quick example text to build on the card title and make up the bulk of the card's content." />
                <AEditable href="#" className="btn btn-primary" value="Go somewhere" />
            </div>
        </div>
    </div>)
}
