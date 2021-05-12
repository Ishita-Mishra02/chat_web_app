import React from "react";
import './styles/register.css'

class Register extends React.Component{
    constructor(){
        super();
        this.state={
            email: '',
            username: '', firstname: '', lastname: '',
            password: ''
        }
    }
    fnChange=(e)=>{
        this.setState({firstname: e.target.value})
    }
    lnChange=(e)=>{
        this.setState({lastname: e.target.value})
    }
    emailChange=(e)=>{
        this.setState({email: e.target.value})
    }
    unChange=(e)=>{
        this.setState({username: e.target.value})
    }
    changeHandler=(e)=>{
        let x=document.getElementById('psw').value
        let y=e.target.value
        if(x!==y){
            this.setState({p2: 'Passwords do not match'})
        }
        else{
            this.setState({p2: ''})
            this.setState({password: e.target.value})
        }
    }
    submitHandler=(event)=>{
        event.preventDefault();
        //console.log(this.state)
        if(this.state.password !== document.getElementById('psw').value)
        {
            alert('Passwords do not match')
            return;
        }
        fetch('/user/signup', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res=> {
            if(res.ok) return res.json()
        })
        .then(jsonres=>alert((jsonres.message).toString()))
        .catch(err=>console.log(err))
    }

    render() {
        return (
            <div className="reg-container">
            <button><a href='/'>LOGIN HERE</a></button>
<form onSubmit={this.submitHandler}>
    <p>Please fill in this form to create an account.</p>
    <hr/>

    <label><b>First Name</b></label>
    <input type="text" name="firstname" onChange={this.fnChange} required/>

    <label><b>Last Name</b></label>
    <input type="text" name="lastname" onChange={this.lnChange} required/>

    <label><b>Username</b></label>
    <input type="text" name="username"  onChange={this.unChange} required/>

    <label><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" onChange={this.emailChange} required/>

    <label><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="password" id="psw" required/>

    <label><b>Confirm Password</b></label>
    <input type="password" placeholder="Confirm psw" name="pass2" id="psw-repeat" onChange={this.changeHandler} required/>
    <div><font color='red'>{this.state.p2}</font></div>
    <hr/>

    <p>By creating an account you agree to our <a href='/pt'>Terms & Privacy</a>.</p>
    <button type="submit" className="registerbtn">Register</button>

    <div>
    <p>Already have an account? <a href='/'>Sign in</a>.</p>
  </div>
  <br></br>
</form>
</div>
        );
      }
}
export default Register;