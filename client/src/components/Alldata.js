import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class Alldata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          columnDefs: [
            { headerName: "Company", field: "company", checkboxSelection: true, sortable: true, filter: true },
            { headerName: "Level", field: "level", sortable: true},
            { headerName: "Total Compensation", field: "totalyearlycompensation", sortable: true},
            { headerName: "Location", field: "location", sortable: true }]
        };
    }
    
    componentDidMount(){
        fetch("https://kpn3r0hyj6.execute-api.us-west-2.amazonaws.com/prod", {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
        }).then(response => {
            response.json().then(data => {
                console.log(data);
                this.setState({rowData: data.body.Items});
            });
        });
    }

    render(){
        return (
            <Container>
                     <div
                        className="ag-theme-alpine"  style={ {height: '40em', width: '80em'} }>
                        <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                        </AgGridReact>
                    </div>
            </Container>
        )
    }
}

export default Alldata;