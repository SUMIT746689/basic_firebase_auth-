import React, { useState } from 'react';
import firebaseConfig from './firebase/firebase';
import {initializeApp} from 'firebase/app';
import { getAuth, signInWithPopup, FacebookAuthProvider,signOut } from "firebase/auth";
import LoginGooogle from './LoginGooogle';
import Registration from './Registration';


initializeApp(firebaseConfig);

export default function Login() {
    const [count,setCount] =useState({
      isLogedIn: false ,
      isGoogleLogedIn : false ,
      displayName : '',
      email : '',
      photoURL : ''
    });
    console.log(count) ;
    
  
    const  handleGoogleInfo =(datas)=>{
      
      if (datas.isGoogleLogedIn){
        const values = {...datas};
        values.isGoogleLogedIn = datas.isGoogleLogedIn;
        values.displayName = datas.displayName ;
        values.email = datas.email ;
        values.photoURL = datas.photoURL;
        setCount(values);
      }
      if(!datas.isGoogleLogedIn){
        const values = {...datas};
        // values.isGoogleLogedIn = false ;
        // values.displayName = '';
        // values.email = '';
        // values.photoURL = '';
        setCount(values)
      console.log(datas)
      }
    }
    
    console.log(count);

    const handleClick =()=>{
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      if(!count.isLogedIn && !count.isGoogleLogedIn){
        signInWithPopup(auth, provider)
        .then((result) => {
        // The signed-in user info.
        const user = result.user;
        
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(user,credential,accessToken);
        const values  = {...count} ;
        values.isLogedIn =(!count.isLogedIn) ;
        values.displayName = user.displayName ;
        values.email = user.email;
        values.photoURL = user.photoURL;
        setCount(values);
        console.log(user)
      
       })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage,email,credential)
        // ...
      });
      }
      if(count.isLogedIn && !count.isGoogleLogedIn) {
        signOut(auth).then(() => {
          const values  = {...count} ;
          values.isLogedIn =(!count.isLogedIn) ;
          values.displayName = '';
          values.email = '';
          values.photoURL = '';
          setCount(values);
        }).catch((error) => {
          // An error happened.
        });
        
      } 

    
    }
    
    console.log(count)
    
    const buttonStyle = {
    padding : '10px',
    backgroundColor : '#282c34' ,
    color : 'white' ,
    border : '1.6px solid white' ,
    borderRadius : '10px' ,
    cursor : 'pointer' ,
    transition : 'all .5s' ,
    fontSize: '16px' ,
    fontWeight : 'medium' ,
    }
    
    
    return (
        <div>
          <br></br>
            <Registration />
            {count.isLogedIn ? <button style={buttonStyle} onClick={handleClick}>Logout With Facebook</button>
            :
            <button style={buttonStyle} onClick={handleClick}>Login With Facebook</button>
            }
            <br/>
            <br/>
            <LoginGooogle isLogedIn={count.isLogedIn} handleGoogleInfo={handleGoogleInfo} />
            <br/>
            <br/>
            
          <div>
            <p>Is Logged In : {count.isLogedIn ? 'True' : 'False'} </p>
            <p>Name : {count.displayName}</p>
            <p>Email : {count.email}</p>
            <p>Photo : <img src ={count.photoURL} alt= 'Photos' /></p>
            
          </div>
        </div>
        
    )
}
