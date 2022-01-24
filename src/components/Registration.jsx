import React ,{ useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import  Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

export default function Registration() {
   const [count,setcount] = useState({
       isRegisted : true,
       isSignedIn : false,
       name : '',
       email : '',
       password : '',
       confirmpassword : ''
   });
   console.log(count);

   const handleClick = (event)=>{
       
        const values = { ...count};
        values[event.target.name]= event.target.value;
        setcount(values);
       

   }

   const handleSubmit=(event)=>{
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, count.email, count.password)
    .then((userCredential) => {
    // Signed in 
        const user = userCredential.user; 
        console.log(user);
        const values = {...count};
        values.isRegisted = !count.isRegisted ;
        setcount(values)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
    // ..
    });
    event.preventDefault()
   }

   const handleSignIn=(e)=>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, count.email, count.password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode , errorMessage)
      })
    e.preventDefault()
   }
    //Create a button click function 
    const createAccount=()=>{
        const values ={...count};
        values.isRegisted = false ;
        setcount(values);
   }
   const properties =
   <div> 
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onBlur={handleClick} name="email" type="email" placeholder="Enter email" required/>
        <Form.Text className="text-muted">
            We'll never share your email with anyone else.
        </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onBlur={handleClick} name="password" type="password" placeholder="Password" required/>
    </Form.Group>
   </div>
   
    return (
    
        <div>
           {!count.isRegisted ? 
           <Form variant="light" onSubmit={handleSubmit} style={{padding:'14px',borderRadius:'10px',boxShadow:' 0 0 10px rgba(0, 0, 0, 0.7)'}}>
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Name : </Form.Label>
                    <Form.Control onBlur={handleClick} type="text" name="name" placeholder="Type name " />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                {properties}
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onBlur={handleClick} name="confirmpassword" type="password" placeholder="Confirm Password" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
           :
           ''
           }
           <br/>
           {!count.isSignedIn ? 
           <Form onSubmit={handleSignIn} style={{padding:'14px',borderRadius:'14px',boxShadow:' 0 0 10px rgba(0, 0, 0, 0.7)'}}>
               <h4 className='text-primary'>Log in </h4>
               {properties}
               <Button variant="primary" type="submit">
                    Log in
                </Button>
                <br/>
               <Button onClick={createAccount} variant="secondary" className='mt-1' >
                    Create a Account ?  
                </Button>

            </Form>
            :
             ''}
            <br></br>
        </div>
    )
}
