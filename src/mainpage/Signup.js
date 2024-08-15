import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'

const Signup = () => {
    const[credentials,setcredentials]=useState({
        name:"",
        email:"",
        password:"",
        Geolocation:""
    })

    const handleSubmit =async(e)=>{

        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/creatuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.Geolocation})
        })
        const json= await response.json()
        console.log(json);

        if(!json.success){
            alert('Enter valid Credentials')
        }

    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

    return (
        <>
<div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input type="text" className="form-control" id="exampleInputPassword1" name='Geolocation' value={credentials.Geolocation} onChange={onChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to='/login' className='m-3 btn btn-danger'>Login</Link>
            </form>
            </div>

        </>
    )
}

export default Signup
