import React from "react";
import { Container } from 'react-bootstrap'

const IndexPage = () => (<>
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
        </div>
    </Container>
</>)

export default IndexPage
