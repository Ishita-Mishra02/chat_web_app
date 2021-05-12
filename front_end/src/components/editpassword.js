import React from 'react'
import './styles/editpsw.css'

class Editpsw extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email: '',password:'',match: true
        }
    }
     passwordChange=(e)=>{
        var y=document.getElementById('p1').value
        if(y===e.target.value){
        this.setState({password: e.target.value,match: true});
        }
        else{
            this.setState({match: false})
        }
     }
    handleSubmit=(e)=> {
        e.preventDefault()
        if(this.state.email===''){
            alert('email is required')
            return
        }
        fetch('/user/editpassword',{
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({password: this.state.password, email: this.state.email})
        })
        .then(res=>{
            if(res.ok) return res.json()
        })
        .then(jsonres=>{
            alert((jsonres.message).toString())
        })
        .catch(err=>console.log(err))
    }
    render(){
        var field=<div></div>
        
        if(this.props.data===null || this.props.data===undefined){
            field=(
                <div>
                <label>email</label>
                <input type='email' onChange={(e)=>this.setState({email: e.target.value})}></input>
                </div>
            )
        }
        else{
            this.setState({email: this.props.data.user.email})
        }
        return(
        <div>
        <a href='/'>Back to home page</a>
        <form onSubmit={this.handleSubmit}>
        {field}
        <label><b>Password</b></label>
        <input type="password" id='p1' required/>

        <label><b>Confirm Password</b></label>
        <input type="password" onChange={this.passwordChange} required/>
        
        <button id='sub-button' type="submit">Submit</button>
        </form>
        </div>
        )
    }
}
export default Editpsw