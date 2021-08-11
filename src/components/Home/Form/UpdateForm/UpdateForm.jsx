
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./updaeForm.scss";
import validator from 'validator' ;

const UpdateForm = () => {
  
  const [name, setName] = useState("") ;
  const [phone, setPhone] = useState("") ;
  const [email, setEmail] = useState("") ;
  const [hobbies, setHobbies] = useState("") ;


  const history = useHistory() ;
  const params = useParams();
  const key = params.email;
  const getData = async () => {
    const fetchData = await fetch(`https://redpositivebackend.herokuapp.com/api/get-to-update/${key}`) ;

    if(fetchData.status == 400){
      history.push("/table") ;
      const message = await fetchData.json()
      return window.alert(message.error)
    }
    else{
      const data2 = await fetchData.json() ;
      setName(data2.name) ;
      setPhone(data2.phone) ;
      setEmail(data2.email) ;
      setHobbies(data2.hobbies)
    }
  }



  useEffect(()=>{
    getData() ;
  },[]) ;

  const sendData = async () => {
    if(!name || !email || !phone || !hobbies){
      return window.alert("required fields are empty")
    } ;
    if(!validator.isEmail(email)){
      return window.alert("Please recheck email")
    }
    if(!validator.isMobilePhone(phone)){
      return window.alert("Please recheck phone number")
    }
    const sending = await fetch("https://redpositivebackend.herokuapp.com/api/update-data", {
      method : "post",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
       key, name, phone, email, hobbies
      })
    }) ;
    const result = await sending ;
    const message = await result.json() ;
    if(result.status == 400){
      return window.alert(message.error )
    }
    else{
      history.push("/table") ;
      window.alert(message.message) ; 
    }
  }


  return (
    <>
     
      <div className="update">
      <h1> UpdateForm </h1>
        <div className="update__inputs">
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="name"/>
          <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder="phone"/>
          <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email"/>
          <input type="text" value={hobbies} onChange={(e)=>{setHobbies(e.target.value)}} placeholder="hobbies"/>
        </div>
        <div className="update__btn">
            <button onClick={sendData}>
                Update
            </button>
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
