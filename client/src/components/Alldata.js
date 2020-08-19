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
            { headerName: "Make", field: "make" },
            { headerName: "Model", field: "model" },
            { headerName: "Price", field: "price" }],
          rowData: [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }]
        }
    }
    
    render(){
        return (
            <Container>
                     <div
                        className="ag-theme-alpine"
                        style={{
                        height: '250px',
                        width: '600px' }} >
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