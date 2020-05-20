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
                    jobTitle: 'selectOne',
                    totalCompensation:'',
                    baseSalary: '',
                    stockGrantValue: '',
                    bonus:'',
                    yoe:'',
                    yearsAtCompany:''
            },
            dropdownOpen: false, 
            rsuText: 'Lakhs', 
            actualLevelsObj: levels,
            actualLevelsArray: [],
            titleMapping: {
                "softwareengineer": "Software Engineer", 
                "softwareengineeringmanager": "Software Engineering Manager", 
                "productmanager": "Product Manager", 
                "datascientist": "Data Scientist", 
                "investmentbanker": "Investment Banker", 
                "technicalprogrammanager": "Technical Program Manager"
            }
        };
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.saveLevelChange = this.saveLevelChange.bind(this);
        this.changeLevels = this.changeLevels.bind(this);
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
    }

    handleCompanyChange(event) {
        let value = event[0];
        var tempObj = this.state.newSalaryInfo;
        tempObj.companyNameSelected = value;

        this.setState({newSalaryInfo: tempObj});
        console.log("Inside Company Change");
        console.log(this.state.newSalaryInfo);
        this.changeLevels();
    }

    saveLevelChange(event) {
        let value = event[0];
        var tempObj = this.state.newSalaryInfo;
        tempObj.level = value;
        this.setState({newSalaryInfo: tempObj});
        console.log("Inside Company Change");
        console.log(this.state.newSalaryInfo);
    }

    changeLevels(){
        var newLevels = this.state.actualLevelsObj;
        if(!this.state.newSalaryInfo.companyNameSelected || this.state.newSalaryInfo.jobTitle === "selectOne"){
            return;
        }
        var title = this.state.titleMapping[this.state.newSalaryInfo.jobTitle]
        if (title && newLevels[title] && newLevels[title][this.state.newSalaryInfo.companyNameSelected]) {
            newLevels = newLevels[title][this.state.newSalaryInfo.companyNameSelected];    
        } else {
            newLevels = [];
        }
        
        var finalLevels = [];
        if(newLevels){
            for (let [key, newLevelValue] of Object.entries(newLevels)) {
                finalLevels = finalLevels.concat(newLevelValue.titles);
            }
            this.setState({
                actualLevelsArray : finalLevels
            });
        }
    }

    handleJobTitleChange(event) {
        let value = event.target.value;
        var tempObj = this.state.newSalaryInfo;
        tempObj.jobTitle = value;
        this.setState({newSalaryInfo: tempObj});
        this.changeLevels();
    }

    handleLocationChange(locationName) {
        let value = locationName[0];
        var tempObj = this.state.newSalaryInfo;
        tempObj.location = value;
        this.setState({newSalaryInfo: tempObj});
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
                                    defaultValue={this.state.companyNameSelected}
                                    placeholder="Company Name"
                                    size="lg"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" value={this.state.newSalaryInfo.jobTitle} id="jobTitle" onChange={this.handleJobTitleChange} bsSize="lg">
                                    <option value="selectOne" disabled>Select Job Title</option>    
                                    <option value="softwareengineer">Software Engineer</option>
                                    <option value="softwareengineeringmanager">Software Engineering Manager</option>
                                    <option value="productmanager">Product Manager</option>
                                    <option value="datascientist">Data Scientist</option>
                                    <option value="investmentbanker">Investment Banker</option>
                                    <option value="technicalprogrammanager">Technical Program Manager</option>
                                    <option value="other">Other</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Typeahead id="levelId" onChange={this.saveLevelChange} size="lg"
                                    allowNew
                                    options={this.state.actualLevelsArray}
                                    selected={this.state.level}
                                    placeholder="Level" />
                            </FormGroup>
                            <FormGroup>
                            <Typeahead id="location" onChange={this.handleLocationChange} size="lg"
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
                                    <Input placeholder="Total Compensation" min={0} max={100} type="number" step="1" bsSize="lg"/>
                                    <InputGroupAddon addonType="append">Lakhs</InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="amount">Base Salary</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                                    <Input placeholder="Base Salary" min={0} max={100} type="number" step="1" bsSize="lg"/>
                                    <InputGroupAddon addonType="append">Lakhs</InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
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
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="amount">Bonus (avg/year)</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                                            <Input placeholder="Bonus (avg/year)" min={0} max={100} type="number" step="1" />
                                            <InputGroupAddon addonType="append">Lakhs</InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>        
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="yoeAtCompany">Years at the Company</Label>
                                    <Input type="text" name="yoeAtCompanyName" id="yoeAtCompany" placeholder="Years at the Company" />
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="totalYoe">Years of Experience</Label>
                                    <Input type="text" name="yoeName" id="totalYoe" placeholder="Years of Experience" />
                                </FormGroup>
                                </Col>
                            </Row>
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