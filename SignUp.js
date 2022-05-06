import React, {useEffect, useState } from 'react';
import Footer from './Footer';
import Nav from './Nav';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, [])
    const collectData =async () => {
        console.warn(name, email, password);
        let result= await fetch('https://localhost:5000/register',{
            method:'post',
            body: JSON.stringify({name,email,password}),
            headers:{
                'content-type':'application/json'
            },
        })
        result = await result.json()
        console.log(result.json());
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
    }
    return (
        <>
        <Nav/>
        <div classname="register">
            <h1>Register</h1>
            <input class="inputBox" type="text" value={name} onChancge={(e) => setName(e.target.value)} placeholder="Enter Name" />
            <input class="inputBox" type="text" value={email} onChancge={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
            <input class="inputBox" type="password" value={password} onChancge={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            <button onClick={collectData} className="button" type="appButton">Sign Up</button>
        </div>
        <Footer/>
        </>

    )

}

export default SignUp;