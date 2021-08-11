import React, { useState } from "react";
import "./form.scss";
import {useHistory} from "react-router-dom" ;
import validator from 'validator' ;

const Form = () => {
  const history = useHistory() ;
  
    const [name, setName] = useState("") ;
    const [phone, setPhone] = useState("") ;
    const [email, setEmail] = useState("") ;
    const [hobbies, setHobbies] = useState("") ;

    const sendData = async () => {
      if(!name || !phone || !email || !hobbies){
        return window.alert("required fields are empty")
      }

      if(!validator.isEmail(email)){
        return window.alert("Please recheck email")
      }
      if(!validator.isMobilePhone(phone)){
        return window.alert("Please recheck phone")
      }
      
      const sending = await fetch("https://redpositivebackend.herokuapp.com/api/add-user", {
        method : "post",
        headers : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {
          name, phone, email, hobbies
        })
      }) ;

      if(sending.status == 400){
        const message = await sending.json() ;

       return window.alert(message.error) ;
      }

      window.alert("Data uploaded successfully") ;
      history.push("/table")
      
    }
  return (
    <>
    
      <div className="form">
      <h1> Form </h1>
        <div className="form__inputs">
          <input type="text" placeholder="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <input type="text" placeholder="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
          <input type="text" placeholder="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="text" placeholder="hobbies" value={hobbies} onChange={(e)=>{setHobbies(e.target.value)}}/>
        </div>
        <div className="form__save-btn">
            <button onClick={sendData}>
                Save
            </button>
        </div>
      </div>
    </>
  );
};

export default Form;
