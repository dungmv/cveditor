import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Form, Button, Container } from 'react-bootstrap'

const upload = () => {
    const router = useRouter();
    const fileInput = useRef<any>();

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        const file = fileInput.current.value;
        const formData = new FormData();
        formData.append('template', file[0]);

        const response = await fetch("/api/templates", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            return router.push("/edit");
        }
    };

    return (<>
        <Container>
            <div className="my-3">
                <Form onSubmit={handleSubmit}>
                    <div className="text-center mb-4">
                        <h4>Upload CV template</h4>
                    </div>
                    <Form.File label="template" lang="en">
                        <Form.File.Label>Template</Form.File.Label>
                        <Form.File.Input ref={fileInput}/>
                    </Form.File>
                    <Button className="btn-block mt-3" variant="primary" type="submit">Upload Template</Button>
                </Form>
            </div>
        </Container>
    </>)
}

export default upload
