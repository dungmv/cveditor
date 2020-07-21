import React from 'react';
import useSWR from 'swr'
import Head from 'next/head'
import { DndProvider } from 'react-dnd'
import { Container } from '../components/editor/Container';
import { HTML5Backend } from 'react-dnd-html5-backend'

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default ({ }) => {
    const { data, error } = useSWR('/api/templates', fetcher);

    return (
        <div className="container px-3 px-lg-5">
            <Head>
                <title>CV Editor Online</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <DndProvider backend={HTML5Backend}>
                {data ? <Container
                    jsx={data.jsx}
                    header={data.header}
                    footer={data.footer}
                    sections={data.sections}
                /> : <h1>loading</h1>}
            </DndProvider>
        </div>
    )
}
