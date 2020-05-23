import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import companynames from '../onlyCompanyName.json';
import fullcities from '../finalListOfCities.json';
import levels from '../levelsInfo.json';

class LevelsForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
                newSalaryInfo: {
                    companyName: '', 
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
            }, 
            cities : fullcities
        };
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.saveLevelChange = this.saveLevelChange.bind(this);
        this.changeLevels = this.changeLevels.bind(this);
        this.handleBaseSalaryChange = this.handleBaseSalaryChange.bind(this);
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

    componentDidMount(){
        fetch("/cities", {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
        }).then(response => {
            response.json().then(data => {
                const mappedData = data.map(x => x.name + "-" + x.state);
                // this.setState({cities: mappedData});
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let salaryInfo = this.state.newSalaryInfo;
        fetch("/post-test", {
          method: "POST",
          body: JSON.stringify(salaryInfo),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }).then(response => {
          response.json().then(data => {
            console.log("Successful" + data.username);
          });
        });
    }

    handleCompanyChange(event) {
        debugger;
        if(event && event.length > 0){
            let value = typeof(event[0]) === "string" ? event[0] : event[0].label;
            var tempObj = this.state.newSalaryInfo;
            tempObj.companyName = value;
            this.setState({newSalaryInfo: tempObj});
            this.changeLevels();
        }
    }

    saveLevelChange(event) {
        if(event && event.length > 0){
            let value = typeof(event[0]) === "string" ? event[0] : event[0].label;
            var tempObj = this.state.newSalaryInfo;
            tempObj.level = value;
            this.setState({newSalaryInfo: tempObj});
        }
    }

    changeLevels(){
        var newLevels = this.state.actualLevelsObj;
        if(!this.state.newSalaryInfo.companyName || this.state.newSalaryInfo.jobTitle === "selectOne"){
            return;
        }
        var title = this.state.titleMapping[this.state.newSalaryInfo.jobTitle]
        if (title && newLevels[title] && newLevels[title][this.state.newSalaryInfo.companyName]) {
            newLevels = newLevels[title][this.state.newSalaryInfo.companyName];    
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
        debugger
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

    handleBaseSalaryChange(baseSalary){
        let name = baseSalary.target.name;
        let value = baseSalary.target.value;
        var tempObj = this.state.newSalaryInfo;
        tempObj[name] = value;
        this.setState({newSalaryInfo: tempObj});
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit} >
                            <FormGroup>
                                <Typeahead id="companynameId" onChange={this.handleCompanyChange}
                                allowNew
                                    options={companynames.sort()}
                                    defaultValue={this.state.companyName}
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
                                    options={fullcities}
                                    selected={this.state.location}
                                    placeholder="Location" className=""
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="amount">Total Compensation</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                                    <Input placeholder="Total Compensation" min={0} max={100} type="number" step="1" bsSize="lg" name="totalCompensation" onChange={this.handleBaseSalaryChange} className=""/>
                                    <InputGroupAddon addonType="append">Lakhs</InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="amount">Base Salary</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                                    <Input placeholder="Base Salary" min={0} max={100} type="number"name="baseSalary"  step="1" bsSize="lg" onChange={this.handleBaseSalaryChange} className=""/>
                                    <InputGroupAddon addonType="append">Lakhs</InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="amount">Stock Grant Value (avg/year)</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <Input type="select" name="select" id="exampleSelect" onChange={this.handleCurrencyChange} >
                                                    <option>₹</option>
                                                    <option>$</option>
                                                </Input>
                                            </InputGroupAddon>
                                            <Input placeholder="Stock Grant Value (avg/year)" min={0} max={100} type="number" step="1"  onChange={this.handleBaseSalaryChange} name="stockGrantValue" className=""/>
                                            <InputGroupAddon addonType="append">{this.state.rsuText}</InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="amount">Bonus (avg/year)</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">₹</InputGroupAddon>
                                            <Input placeholder="Bonus (avg/year)" min={0} max={100} type="number" step="1"onChange={this.handleBaseSalaryChange} name="bonus" className=""/>
                                            <InputGroupAddon addonType="append">Lakhs</InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>        
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="yoeAtCompany">Years at the Company</Label>
                                    <Input type="text" name="yearsAtCompany" id="yoeAtCompany" placeholder="Years at the Company" onChange={this.handleBaseSalaryChange} className=""/>
                                </FormGroup>
                                </Col>
                                <Col md={6}>
                                <FormGroup>
                                    <Label for="totalYoe">Years of Experience</Label>
                                    <Input type="text" name="yoe" id="totalYoe" placeholder="Years of Experience" onChange={this.handleBaseSalaryChange} className=""/>
                                </FormGroup>
                                </Col>
                            </Row>
                            <p className="textCenter">
                                <Button type="submit" color="primary" className="mx-auto" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
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