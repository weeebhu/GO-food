import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [credentials, setcredentials] = useState({name: "", email: "", password: "", geolocation: ""});           //we are changing credentials using setcredentials without reloading

  const handleSubmit = async(e) => {
    console.log('hello world')
    e.preventDefault(); //synthetic event
    const response = await fetch("http://localhost:5000/api/createuser",{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation}),     //we send data in stringify formate to backend
    });

    const json = await response.json()
    console.log(json)
    if(!json.success){
      alert("Enter Valid Crendtials.")
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
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange}/>
            {/* we use onChange event lister to change default values that are given by value attribuite */}
          </div>

          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password} id="exampleInputPassword1"/>
          </div>

          <div className="mb-3">
            <label htmlFor="Address" className="form-label">Address</label>
            <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} id="exampleInputlocation1"/>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/login" className="m-3 btn btn-danger">Already a User?</Link>
        </form>
      </div>
    </>
  );
}


