import React, { useEffect, useState } from "react";
import "./table.scss";
import { NavLink, useHistory } from "react-router-dom";


const Table = () => {
  const [emailLoading, setEmailLoading] = useState("") ;
  const [data, setData] = useState([]);
  const getData = async () => {
    const fetching = await fetch("https://redpositivebackend.herokuapp.com/api/get-data");
    setData(await fetching.json());
  };
  useEffect(() => {
    getData();
  }, []);
  const history = useHistory() ;

  const deleteRecord = async (email) => {
    const sendRequest = await fetch (`https://redpositivebackend.herokuapp.com/${email}`) ; 
    const result = await sendRequest ;
    const message = await sendRequest.json() ;
    if(result.status == 400){
      return window.alert(message.error)
    }
    else if(result.status == 200){
      getData() ;
      return window.alert(message.message)
    }
    
  }

 
  const multidel = [] ;

  const setToDelete = (e, email) => {
    if(e.target.checked == true){
      multidel.push(email) ;
    }
    else{
      const index = multidel.indexOf(email) ;
      multidel.splice(index, 1) ;
    }
  } ;
  const deleteSelected = async () => {
    if(multidel.length == 0){
      return window.alert("nothing selected to delete") ;
    }
    const sendRequest = await fetch("https://redpositivebackend.herokuapp.com/api/multiple-delete", {
      method : "post" ,
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        list : multidel
      })
    }) ;

    if(sendRequest.status == 200){
      getData() ;
      window.location.reload() ;
      return window.alert("successfully deleted")
    }
    else{
      window.alert("some error occured")
    }

  }

  
  const sendMail = async () => {
    setEmailLoading("Loading ...")
      if(multidel.length == 0){
        return window.alert("nothing is selected") ;
      }
      const sendRequest = await fetch("https://redpositivebackend.herokuapp.com/api/send-email", {
        method : "post",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          list : multidel
        })
      }) ;

      if(sendRequest.status == 400){
        return window.alert("some error occurred") ;
      }
      if(sendRequest.status == 200){
        window.location.reload() ;
        return window.alert("Emailed successfully") ;
      }
  }
  return (
    <>
      <div className="table__container">
        <div className="table">
          <table>
            <tbody>
            <tr>
              <th>Select</th>
              <th>id</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Hobbies</th>
              <th>Update/delete</th>
            </tr>
            {data.map((obj, index) => {
              return (
                <React.Fragment key={index}>
                  <tr className="">
                    <td>
                      <input type="checkbox" name="" id="" onClick={(e)=>{setToDelete(e, obj.email)}}/>
                    
                    </td>
                    <td>{index + 1}</td>
                    <td>{obj.name}</td>
                    <td>{obj.phone}</td>
                    <td>{obj.email}</td>
                    <td>{obj.hobbies}</td>
                    <td>
                      <button className="update">
                        <NavLink to={`/update/${obj.email}`}>update</NavLink>
                      </button>
                      <button className="delete" onClick={()=>deleteRecord(obj.email)}>delete</button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
            </tbody>
          </table>
          <button className="multi-delete" onClick={deleteSelected}>Delete Selected</button>
          <button className="send-mail" onClick={sendMail}>
            Send selected data as mail
          </button>
        </div>
      </div>
      <h2>
        {emailLoading}
      </h2>
    </>
  );
};

export default Table;
