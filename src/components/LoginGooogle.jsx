import React ,{useState,useEffect} from 'react';
import  {initializeApp}  from "firebase/app";
import firebaseConfig from './firebase/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
import { Button } from 'react-bootstrap';

initializeApp(firebaseConfig);

export default function LoginGooogle(props) {
   
    console.log(props.handleGoogleInfo);
    const [count,setCount]=useState({
        isLogedIn : false,
        isGoogleLogedIn : false,
        displayName : '',
        email : '',
        photoURL : ''
    });
    
    useEffect(() => {
        let copyValues = {...count};
        copyValues.isLogedIn= props.isLogedIn;
        setCount(copyValues);
        
        }
    , [props.isLogedIn]
    ) 
    useEffect (()=>{
        props.handleGoogleInfo({...count}) 
    },[count.isGoogleLogedIn])
    
    const provider = new GoogleAuthProvider();
    console.log(count);
    
    const handleGoogleClick =()=>{
        const auth = getAuth();
        if(!count.isGoogleLogedIn && !count.isLogedIn ){
            signInWithPopup(auth, provider)
            .then((result) => {
            
            const user = result.user;
            const values = {...count} ;
            values.isGoogleLogedIn = !count.isGoogleLogedIn;
            values.displayName = user.displayName ;
            values.email = user.email;
            values.photoURL = user.photoURL;
            setCount(values);
            console.log(user);
            
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            console.log(errorCode,errorMessage,email);
        });
        }
        if(count.isGoogleLogedIn & !count.isLogedIn){
            signOut(auth).then(() => {
                const values = {...count} ;
                values.isGoogleLogedIn = !count.isGoogleLogedIn;
                values.displayName = '';
                values.email = '';
                values.photoURL = '';
                setCount(values);
              }).catch((error) => {
                // An error happened.
              });
              
        }
    }
    
    return (
        <div>
            {!count.isGoogleLogedIn ? <Button onClick={handleGoogleClick} >Login with google</Button>
            :
            <Button onClick={handleGoogleClick} >Logout with google</Button>
            }
            <div>name : {count.displayName}</div>
            <div>email : {count.email}</div>
            <div>photo : {count.photoURL}</div>
        </div>
    )
}
