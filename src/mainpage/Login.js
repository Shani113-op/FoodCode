import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const [credentials, setcredentials] = useState({
    email: "",
    password: ""
})
let navigate=useNavigate();

const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json()
    console.log(json);

    if (!json.success) {
        alert('Enter valid Credentials')
    }
    if (json.success) {
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }

}
const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
}
  return (
    <div>
      <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to='/creatUser' className='m-3 btn btn-danger'>Register</Link>
                </form>
            </div>
    </div>
  )
}

export default Login
