import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const [creden, setCreden] = useState({email:"", password:""});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`https://cloudnote-backend.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: creden.email, password: creden.password})
          });

        const json = await response.json();
        console.log(json)
        if(json.success)
        {
            // redirect
            localStorage.setItem('token', json.authToken)
            navigate("/");
            props.showAlert("logged in successfully", "success");
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCreden({ ...creden, [e.target.name]: e.target.value })
      }
  return (
    <div className="my-5">
    <h1 className='mb-5'>Login to proceed</h1>
      <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}
        value={creden.email}
    />
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name='password' onChange={onChange} value={creden.password}/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login

