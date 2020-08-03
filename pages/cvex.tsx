import React from 'react';
import useSWR from 'swr'
import Head from 'next/head'
import { DndProvider } from 'react-dnd'
import CVEditor from '../components/editor'
import { HTML5Backend } from 'react-dnd-html5-backend'

const templateFetcher = (url: string) => fetch(url).then(r => r.json()).then(template => {
    let counter: number = 0;
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

const cve = ({ }) => {
    const { data, error } = useSWR('/api/templates', templateFetcher);

    return (
        <div className="container px-3 px-lg-5">
            <Head>
                <title>CV Editor Online</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <DndProvider backend={HTML5Backend}>
                {data ? <CVEditor template={data} /> : <h1>loading</h1>}
            </DndProvider>
        </div>
    )
}

export default cve;
