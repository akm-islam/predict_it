import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Button,Row,Col,Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,Modal, ModalHeader, ModalBody, ModalFooter,FormGroup,Input } from 'reactstrap';
import Heatmap from './components/Heatmap';
import * as algorithms from "./algorithms/fetch.js"

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    file:{},
    modal: false,
    xLabels:null,
    yLabels:['Sun', 'Mon', 'Tue'],
    data:null,
  }
};

//-----------------------------------------------------------------Upload Files
handleFile=(e)=>{
  let file=e.target.files
  this.setState({file:file})
}
handleUpload=(e)=>{
  let file=this.state.file;
  let formdata=new FormData()
  for (var key in this.state.file) {
  formdata.append('file',this.state.file[key])
  }
  axios({
    url:'http://localhost:5000/uploader',
    method:"POST",
    headers:{
    authorizition:'Hello'
    },
    data:formdata
  }).then((respose_from_server)=>{
  // then is the response
  alert("Uploaded successfull")  
  console.log(respose_from_server.data)
  },(err)=>{
    console.log(err)
  })
}
//-----------------------------------------------------------------JsonHandler
jsonHandler=()=>{
  var a=algorithms.jsonHandler().then(function(result) {
    console.log(result)
  });
}
//-----------------------------------------------------------------Render function starts here  
render() {
  return (
    <div>
{ /* Navbar starts here */ }
        <Navbar style={{backgroundColor:"rgb(224,224,224,.3)"}} expand="sm" >
          <NavbarBrand href="/">PredictIt</NavbarBrand>
          <NavbarToggler/>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Sort by
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={this.sort_by_attributes}>
                    Atribute
                  </DropdownItem>
                  <DropdownItem onClick={this.sort_by_dataset}>
                    Datasets
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Button color="warning" size="md" onClick={this.jsonHandler}>Process</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
{ /* File Upload (first column starts here) */ }
        <Row className="row1">
          <Col md="2" style={{padding:0}} className="upload">
          <div style={{backgroundColor:"rgb(224,224,224,.3)",width:"100%",height:"700px"}}>
            <FormGroup className="formclass">
              <Input type="file" name="fileupload" id="fileupload" onChange={(e)=>this.handleFile(e)} multiple={true}></Input>
              <Button className="buttonclass" color="info" size="sm" onClick={(e)=>this.handleUpload(e)} block>Upload</Button>
            </FormGroup>
          </div>
          </Col>
{ /* Main view starts here */ }
          <Col className="main" style={{backgroundColor:"rgb(224,224,224,.3)",overflow:"scroll",padding:1}}> 
          </Col>
        </Row>
{ /* Modal starts here */ }
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop} size="xl" style={{maxWidth: '1600px', width: '90%'}}>
          <ModalHeader toggle={this.toggle}>Modal Title</ModalHeader>
          <ModalBody>
          <Row>
          <Col md="2" style={{padding:1}}>
          <div style={{backgroundColor:"rgb(224,224,224,.3)",width:"100%",height:"400px"}}></div>
          </Col>
          <Col md="10" style={{padding:1}}>
          <div style={{backgroundColor:"rgb(224,224,224,.3)",width:"100%",height:"400px"}}>
          </div>
          </Col>
        </Row>
          </ModalBody>
        </Modal>
{ /* Modal ends here */ }
    </div>
    );
  }
}
export default App;

