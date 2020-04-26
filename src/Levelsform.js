import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015


class LevelsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selected: ''
        };
    }
    
    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <Label for="companyname">Company Name</Label>
                                <Typeahead id="companynameId" onChange={(selected) => {
                                        this.setState({selected});
                                    }}
                                    options={["Google","Facebook","Microsoft",
                                    "Amazon","Apple","LinkedIn",
                                    "Yahoo","Uber","Lyft",
                                    "Airbnb","Dropbox","Pinterest",
                                    "Salesforce","Oracle","Twitter",
                                    "Netflix","Tesla","Coinbase",
                                    "Intercom","Zillow","eBay",
                                    "Instacart","Visa","SoFi",
                                    "Adobe","Careem","Cruise",
                                    "Roblox","Robinhood","Shopify",
                                    "Flipkart","Broadcom","Comcast",
                                    "Opendoor","ServiceNow","Rubrik",
                                    "Stripe","Slack","Quora",
                                    "Square","Bloomberg","Cerner",
                                    "WalmartLabs","Snap","Affirm",
                                    "ElectronicArts","Palantir","Twilio",
                                    "Okta","PayPal","Workday",
                                    "Pivotal","Autodesk","NetApp",
                                    "Nvidia","SAP","Atlassian",
                                    "Twitch","Yelp"
                                    ]}
                                    selected={this.state.selected}
                                    placeholder="Company Name"
                                />
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