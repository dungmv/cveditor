import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Form, Button, Container } from 'react-bootstrap'

const SignInPage = () => {
    const router = useRouter();
    const emailInput = useRef<any>();
    const passwordInput = useRef<any>();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        const response = await fetch("/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            return router.push("/cvex");
        }
    };

    return (<>
        <style jsx>{`
            .form-signin {
                width: 100%;
                max-width: 420px;
                padding: 15px;
                margin: auto;
            }
       `}</style>
        <Container>
            <div className="form-signin">
                <Form onSubmit={handleSubmit}>
                    <div className="text-center mb-4">
                        <h4>CVShine</h4>
                    </div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailInput}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordInput}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button className="btn-block" variant="primary" type="submit">Sign In</Button>
                </Form>
            </div>
        </Container>
    </>);
};

export default SignInPage;
