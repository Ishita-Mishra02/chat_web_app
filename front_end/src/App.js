import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Chat from './components/chat';
import Editpsw from './components/editpassword';
import Login from './components/login';
import Register from './components/register';

class App extends React.Component{
    constructor(){
      super()
      this.state={data: null}
      this.fetchUser=this.fetchUser.bind(this)
    }
    componentDidMount() {
      this.fetchUser()
    }
    successLogin=(data)=>{
      this.setState({data: data})
      localStorage.setItem('logged', '1')
    }
    logout=()=> {
      this.setState({data: null})
      localStorage.removeItem("logged")
    }
    fetchUser=()=>{
      if(localStorage.getItem('logged')==='1' && this.state.data===null)
      {
        fetch('/user/fetchuser',{
          method: 'get'
      })
      .then(res=>{
          if(res.ok) return res.json()
      })
      .then(res1=>{
         this.setState({data: res1})
         console.log(this.state.data)
      })
      .catch(err=>console.log(err))
      }
    }
    render(){
    return(
    <Switch>
      <Route exact path='/' render={()=> (this.state.data===null) ?<Login logged={this.successLogin}/> :<Chat logout={this.logout} data={this.state.data}/>}/>
      <Route exact path='/register' render={()=> (!this.state.log)? <Register/>: <Chat/>}/>
      <Route exact path='/password' render={()=><Editpsw data={this.state.data}/>}/>
      <br></br>
    </Switch>
    )}
}
export default App;
