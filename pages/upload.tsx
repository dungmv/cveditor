import { Form, Container } from 'react-bootstrap'

const Page = () => (
    <Container>
        <div className="my-3">
            <Form>
                <Form.File label="template" lang="en" custom>
                    <Form.File.Input isValid />
                    <Form.File.Label data-browse="upload">template</Form.File.Label>
                    <Form.Control.Feedback type="valid">success!</Form.Control.Feedback>
                </Form.File>
            </Form>
        </div>
    </Container>
)

export default Page
