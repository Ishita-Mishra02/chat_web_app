import React from 'react'
import './styles/login.css'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',password:''
        }
    }
    emailChange=(e)=> {
        this.setState({email: e.target.value});
     }
     passwordChange=(e)=>{
        this.setState({password: e.target.value});
     }
    handleLogin=(e)=> {
        e.preventDefault()
        fetch('/user/login',{
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res=>{
            if(res.ok) {
                return res.json()}
        })
        .then(jsonres=>{
            alert((jsonres.message).toString())
            if(jsonres.message==='login successful'){
            this.props.logged(jsonres)
            }
        })
        .catch(err=>console.log(err))
    }
    render(){
        return(
        <div className='login'>
        <form onSubmit={this.handleLogin}>
            <label><b>Email</b></label>
            <input type="email" onChange={this.emailChange} required/>

            <label><b>Password</b></label>
            <input type="password" onChange={this.passwordChange} required/>
            Forgot password? <a href='/password'>click here</a>
            <br></br>
            <button id='login-button' type="submit">Login</button>
            Don't have an account? <a href='/register'>Sign Up</a>
        </form>
        <br></br>
        </div>
        )
    }
}
export default Login