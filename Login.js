import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate('/')
        }
    },[])
    const handleLogin = async () => {

        let result = await fetch('http://localhost:5000/login',{
            method: 'post',
            body:JSON.stringyfy({email,password}),
            headers:{
                'content-type':'application/json'
            },
        });
        result = await result.json();
        console.warn(result)
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/")
        }else{
            alert("please enter all the details")
        }
    }
    return (
        <div className='login'>

            <input type="text" claasName="inputBox" placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)} />
            <input type="password" claasName="inputBox" placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin} className="button" type="appButton">Login</button>
        </div>
    )
}
export default Login;