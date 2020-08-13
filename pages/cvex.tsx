import React from 'react';
import useSWR from 'swr'
import Head from 'next/head'
import { DndProvider } from 'react-dnd'
import CVEditor from '../components/editor'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap'

const templateFetcher = (url: string) => fetch(url).then(r => r.json()).then(template => {
    let counter: number = 10;
    template.sections.forEach((col: any) => {
        col.forEach((sec: any) => {
            counter++;
            sec.id = counter;
            sec.subs = sec.subs.map((el: string) => {
                counter++;
                return { id: counter, jsx: el };
            });
        })
    });
    return template;
});

const editor = ({ }) => {
    const { data, error } = useSWR('/api/templates/1', templateFetcher);

    return (<>
        <Head>
            <title>CV Editor Online</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <div className="bg-white border-bottom shadow-sm fixed-top">
            <div className="container">
                <div className="d-flex flex-column flex-md-row align-items-center p-1">
                    <Button variant="outline"><i className="fas fa-line-height"></i></Button>
                    <Dropdown aria-label="text-font">
                        <Dropdown.Toggle variant="outline"><i className="fas fa-text-height"></i></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Large</Dropdown.Item>
                            <Dropdown.Item href="#">Normal</Dropdown.Item>
                            <Dropdown.Item href="#">Small</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <span className="border-right" style={{width: 1, height: '1rem'}}></span>
                    <Dropdown aria-label="text-font">
                        <Dropdown.Toggle variant="outline"><i className="fas fa-font"></i></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Arial</Dropdown.Item>
                            <Dropdown.Item href="#">Roboto</Dropdown.Item>
                            <Dropdown.Item href="#">Open Sans</Dropdown.Item>
                            <Dropdown.Item href="#">Time New Roman</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <span className="border-right" style={{width: 1, height: '1rem'}}></span>
                    <ButtonGroup aria-label="text-decoration">
                        <Button variant="outline"><i className="fas fa-bold"></i></Button>
                        <Button variant="outline"><i className="fas fa-italic"></i></Button>
                        <Button variant="outline"><i className="fas fa-underline"></i></Button>
                    </ButtonGroup>
                    <span className="border-right" style={{width: 1, height: '1rem'}}></span>
                    <ButtonGroup aria-label="text-align">
                        <Button variant="outline"><i className="fa fa-align-left"></i></Button>
                        <Button variant="outline"><i className="fa fa-align-right"></i></Button>
                        <Button variant="outline"><i className="fa fa-align-center"></i></Button>
                        <Button variant="outline"><i className="fa fa-align-justify"></i></Button>
                    </ButtonGroup>
                    <span className="border-right" style={{width: 1, height: '1rem'}}></span>
                    <ButtonGroup aria-label="text-list">
                        <Button variant="outline"><i className="fa fa-list-ol"></i></Button>
                        <Button variant="outline"><i className="fa fa-list-ul"></i></Button>
                    </ButtonGroup>
                    <span className="border-right" style={{width: 1, height: '1rem'}}></span>
                    <ButtonGroup aria-label="undo-actions">
                        <Button variant="outline"><i className="fa fa-undo"></i></Button>
                        <Button variant="outline"><i className="fa fa-redo"></i></Button>
                    </ButtonGroup>
                    <span className="border-right" style={{width: 1, height: '1rem'}}></span>
                    <Button variant="outline"><i className="fa fa-download"></i></Button>
                    <Button variant="outline"><i className="fa fa-save"></i></Button>
                </div>
            </div>
        </div>
        <div className="container mx-auto theme-bg-light shadow" style={{marginTop: '5rem', marginBottom: '5rem'}}>
            <DndProvider backend={HTML5Backend}>
                {data ? <CVEditor template={data} /> : <h1>loading</h1>}
            </DndProvider>
        </div>
    </>)
}

export default editor;
