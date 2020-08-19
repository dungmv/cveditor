import useSWR from 'swr'
import React from "react";
import Head from 'next/head'
import Link from "next/link";
import { Container } from 'react-bootstrap'

const IndexPage = () => {
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
                    <li><Link href="/login"><a>login</a></Link></li>
                    <li><Link href="/upload"><a>upload</a></Link></li>
                    <li><Link href="/api/downloads/1"><a>download</a></Link></li>
                    <li><Link href="/cvex/1"><a>demo</a></Link></li>
                    <li><Link href="/edit"><a>edit</a></Link></li>
                </ul>
            </div>
        </Container>
    </>)
}

export default IndexPage
