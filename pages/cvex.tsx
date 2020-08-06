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
    const { data, error } = useSWR('/api/templates', templateFetcher);

    return (<>
        <Head>
            <title>CV Editor Online</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div className="bg-white border-bottom shadow-sm fixed-top">
            <div className="container">
                <div className="d-flex flex-column flex-md-row align-items-center p-1">
                    <Dropdown aria-label="text-font">
                        <Dropdown.Toggle variant="outline">Arial</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Arial</Dropdown.Item>
                            <Dropdown.Item href="#">Roboto</Dropdown.Item>
                            <Dropdown.Item href="#">Open Sans</Dropdown.Item>
                            <Dropdown.Item href="#">Time New Roman</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <span className="border-right" style={{width: 1, height: '1rem'}}></span>
                    <ButtonGroup aria-label="text-decoration">
                        <Button variant="outline"><b className="font-weight-bold">B</b></Button>
                        <Button variant="outline"><i className="font-italic">I</i></Button>
                        <Button variant="outline"><u className="font-weight-normal">U</u></Button>
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
                    <Button variant="outline"><i className="fa fa-download"></i></Button>
                    <Button variant="outline"><i className="fa fa-save"></i></Button>
                </div>
            </div>
        </div>
        <div className="container mx-auto theme-bg-light shadow-lg my-5">
            <DndProvider backend={HTML5Backend}>
                {data ? <CVEditor template={data} /> : <h1>loading</h1>}
            </DndProvider>
        </div>
    </>)
}

export default editor;
