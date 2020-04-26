import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';


class LevelsForm extends React.Component{
    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <Label for="companyname">Company Name</Label>
                                <Input type="email" name="companyname" id="companynameId" placeholder="Company Name" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="level" id="levelId" placeholder="Level" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect">Select</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                                <Input placeholder="Amount" min={0} max={100} type="number" step="1" />
                                <InputGroupAddon addonType="append">Lakhs</InputGroupAddon>
                            </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Text Area</Label>
                                <Input type="textarea" name="text" id="exampleText" />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                <Input type="checkbox" />{' '}
                                Check me out
                                </Label>
                            </FormGroup>
                        <Button color="primary">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LevelsForm