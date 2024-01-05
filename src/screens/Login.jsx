import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [credentials, setcredentials] = useState({email: "", password: ""});           //we are changing credentials using setcredentials without reloading
    let navigate = useNavigate()   //navigating to home page.

    const handleSubmit = async(e) => {
      console.log('hello world')
      e.preventDefault(); //synthetic event
      
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:credentials.email, password:credentials.password}),     //we send data in stringify formate to backend
      });
  
      const json = await response.json()
      console.log(json)
      if(!json.success){
        alert("Enter Valid Crendtials.")
      }
      if(json.success) {
        localStorage.setItem("userEmail", credentials.email);
        console.log(credentials.email)
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"))
        navigate("/");
      }

    };
  
    const onChange=(event)=>{
      setcredentials({ ...credentials, [event.target.name]: event.target.value }) //inside crdentials it will change value of name email password geolocation on change of value
    }

  return (
        <>
      <div className="container">
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password} id="exampleInputPassword1"/>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger">I'm a new User?</Link>
        </form>
      </div>
    </>
  );
}
