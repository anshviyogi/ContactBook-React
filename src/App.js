import './App.css';
import React from 'react';
import {useState} from 'react'
import {Container,Form,Button,InputGroup,Row,Col} from 'react-bootstrap'
import { MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
} from 'mdb-react-ui-kit';


function App() {
//Decelerations

  const [optSmModal, setOptSmModal] = useState(false);
  const toggleShow = () => setOptSmModal(!optSmModal);

  const [name,setName] = useState({firstName:"",lastName:"",contactNumber:""})
  const [submitName,setSubmitName] = useState([])
  const[search,setSearch] = useState("")

// functions
function submitHandler(e){
e.preventDefault()
if(name.firstName === "" || name.contactNumber === ""){
  alert("Enter the empty fields")
}
else{
setSubmitName(name1 => [...name1,{firstName:name.firstName,lastName:name.lastName,contactNumber:name.contactNumber}])
// Problem clearing fields....
// name.firstName = " "
setName({firstName:"",lastName:"",contactNumber:""})
}
}

function deleteHandler(index){
const newList = submitName.filter((name,id) => id !== index)
setSubmitName(newList)
}

  return(
    <>
    <div className="top-header">
    <Container fluid className='container-fluid'>
      <h1 className='header-text'>Contact Book</h1>
      {/* Starting with search bar */}

    </Container>
    
    <InputGroup className="mb-3 search-and-add">
        <Form.Control
          placeholder="Search Contacts"
          onChange={e => setSearch(e.target.value)}
        />
        <Button variant="danger" id="button-addon2" onClick={toggleShow}>
          Add
        </Button>
      </InputGroup>
      
      </div>

{/* Starting modal */}

{/* Modal stuff */}

<MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}>
     <MDBModalDialog size='xl'>
       <MDBModalContent>
         <MDBModalHeader>
           <MDBModalTitle>Contact Form</MDBModalTitle>
           <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
         </MDBModalHeader>
         {/* Starting Form */}
         <Form onSubmit={submitHandler}>
         <Container>
           {/* Row for first and last name inline */}
           <Row>
             <Col sm={6}>
             <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>First Name</Form.Label>
     <Form.Control type="text" placeholder="Enter the First Name" onChange={e => setName(name =>( {...name,"firstName":e.target.value}))} value={name.firstName} />
   </Form.Group>
             </Col>
             <Col sm={6}>
             <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Last Name</Form.Label>
     <Form.Control type="text" placeholder="Enter the Last Name" onChange={e => setName(name => ({...name,"lastName":e.target.value}))} value={name.lastName}/>
   </Form.Group>
             </Col>
           </Row>
           {/* Name row ended */}
           <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Phone</Form.Label>
     {/* Using type text for avoiding the incr and decr of number icons */}
     <Form.Control type="text" placeholder="+91-XXXX XX XXXX" onChange={e => setName(name => ({...name,"contactNumber":e.target.value}))} value={name.contactNumber}/>
   </Form.Group>

   </Container>
   <Button type="submit" style={{margin:"10px",width:"98%"}}>Add Contact</Button>
   </Form>
       </MDBModalContent>
     </MDBModalDialog>
   </MDBModal>
   
   {/* Modal completed */}
   {/* Showing contacts */}
  
     
{submitName.length == 0 ? <h1 className='norecord'>No Records Found !!</h1> : <h2 className="contact-title">Your Contacts</h2>}

{/* Problem 2 - searching problem for the next word */}

     {submitName.filter((names) => names.firstName.includes(search) || names.lastName.includes(search) || names.contactNumber.includes(search)).map((finalResult,idx) =>(
      <>
      <Container>
      <li key={idx} className="contacts">
        <Container>
        <h4>{finalResult.firstName + " " + finalResult.lastName}</h4>
        <Button className="delete-button" variant="outline-danger" onClick={()=> deleteHandler(idx)}>x</Button>
        <p>{finalResult.contactNumber}</p>
        </Container>
      </li>
      </Container>
      </>
     ))}
    </>
  )
}

export default App;