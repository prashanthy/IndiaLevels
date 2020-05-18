import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import companynames from './onlyCompanyName.json';
import cities from './finalListOfCities.json';
import levels from './levelsInfo.json';

class LevelsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
                newSalaryInfo: {
                    companyNameSelected: '', 
                    location:'', 
                    level:'',
                    jobTitle: '',
                    totalCompensation:'',
                    baseSalary: '',
                    stockGrantValue: '',
                    bonus:'',
                    yoe:'',
                    yearsAtCompany:''
            },
            dropdownOpen: false, 
            rsuText: 'Lakhs', 
            actualLevels: levels
        };
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleLevelChange = this.handleLevelChange.bind(this);
    }
    
    toggleDropDown(params){
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleCurrencyChange(e) {
        if(e.target.value === "$"){
            this.setState({
                rsuText: 'Dollars'
            });
        } 
        else if(e.target.value === "₹"){
            this.setState({
                rsuText: 'Lakhs'
            });
        } 
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        debugger;
    }

    handleCompanyChange(event) {
        let value = event[0];
        this.setState(
            prevState => ({
                newSalaryInfo: {
                    ...prevState.newSalaryInfo,
                    companyNameSelected: value
                }
            }),
            () => console.log(this.state.newUser)
        );
    }

    handleLevelChange(event) {
        debugger
        let value = event[0];
        this.setState(
            prevState => ({
                newSalaryInfo: {
                    ...prevState.newSalaryInfo,
                    level: value
                }
            }),
            () => console.log(this.state.newUser)
        );
    }

    handleTitleChange(event) {
        let value = event.target.value;
        this.setState(
            prevState => ({
                newSalaryInfo: {
                    ...prevState.newSalaryInfo,
                    jobTitle: value
                }
            }),
            () => console.log(this.state.newUser)
        );
        debugger
        var newLevels = this.state.actualLevels;
        newLevels = newLevels[value][this.state.newSalaryInfo["companyNameSelected"]]
        this.setState(
            prevState => ({
                newSalaryInfo: {
                    ...prevState.newSalaryInfo,
                    actualLevels : newLevels
                }
            })
        )
    }


    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <FormGroup>
                                <Typeahead id="companynameId" onChange={this.handleCompanyChange}
                                allowNew
                                    options={companynames.sort()}
                                    selected={this.state.companyNameSelected}
                                    placeholder="Company Name"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" name="select" id="jobTitleId" onChange={this.handleTitleChange}>
                                <option selected="selected" disabled="disabled">Select Job Title</option>    
                                <option>Software Engineer</option>
                                <option>Software Engineering Manager</option>
                                <option>Product Manager</option>
                                <option>Data Scientist</option>
                                <option>Technical Program Manager</option>
                                <option>Investment Banker</option>
                                <option>Other</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Typeahead id="levelId" onChange={this.handleLevelChange}
                                    allowNew
                                    options={this.state.actualLevels}
                                    selected={this.state.level}
                                    placeholder="Level" />
                            </FormGroup>
                            <FormGroup>
                            <Typeahead id="locationId" onChange={(selected) => {
                                        this.setState({selected});
                                }}
                                allowNew
                                    options={cities.sort()}
                                    selected={this.state.location}
                                    placeholder="Location"
                                />
                            </FormGroup>
                            <FormGroup>
                            <Label for="amount">Total Compensation</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                                <Input placeholder="Total Compensation" min={0} max={100} type="number" step="1" />
                                <InputGroupAddon addonType="append">Lakhs</InputGroupAddon>
                            </InputGroup>
                            </FormGroup>
                            <FormGroup>
                            <Label for="amount">Base Salary</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                                <Input placeholder="Base Salary" min={0} max={100} type="number" step="1" />
                                <InputGroupAddon addonType="append">Lakhs</InputGroupAddon>
                            </InputGroup>
                            </FormGroup>
                            <FormGroup>
                            <Label for="amount">Stock Grant Value (avg/year)</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Input type="select" name="select" id="exampleSelect" onChange={this.handleCurrencyChange}>
                                        <option>₹</option>
                                        <option>$</option>
                                    </Input>
                                </InputGroupAddon>
                                <Input placeholder="Stock Grant Value (avg/year)" min={0} max={100} type="number" step="1" />
                                <InputGroupAddon addonType="append">{this.state.rsuText}</InputGroupAddon>
                            </InputGroup>
                            </FormGroup>
                            <FormGroup>
                            <Label for="amount">Bonus (avg/year)</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                                <Input placeholder="Bonus (avg/year)" min={0} max={100} type="number" step="1" />
                                <InputGroupAddon addonType="append">Lakhs</InputGroupAddon>
                            </InputGroup>
                            </FormGroup>
                            <p className="textCenter">
                                <Button onSubmit={this.handleSubmit} type="submit" color="primary" className="mx-auto" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    Submit
                                </Button>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LevelsForm