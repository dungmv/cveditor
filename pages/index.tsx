import useSWR from 'swr'
import React from "react";
import Head from 'next/head'
import { Container } from 'react-bootstrap'

const fetcher = (url: string) => fetch(url, {mode: 'no-cors'}).then(r => r.text())

const IndexPage = () => {
    const { data, error } = useSWR('https://www.google.com.vn', fetcher);
    return (<>
        <Head>
            <title>CV Editor Online</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Container>
            <div className="my-3">
                <div className="text-center mb-4">
                    <h4>CVShine</h4>
                </div>
                <ul>
                    <li><a href="/login">login</a></li>
                    <li><a href="/upload">upload</a></li>
                    <li><a href="/cvex">demo</a></li>
                    <li><a href="/edit">edit</a></li>
                </ul>
                {data != null ? <pre>{data}</pre> : <h1>loading</h1>}
            </div>
        </Container>
    </>)
}

export default IndexPage
