import React from 'react'
import './styles/message.css';

class Message extends React.Component{
  constructor(props){
    super(props);
    this.state={list: [],curr: ''}
  }
  handleSend=(e)=>{
    e.preventDefault();
    var message= this.state.curr
    this.props.send(message)
    document.getElementById('type-msg').value=''
    this.setState({curr:''})
  }
  handleChange=(e)=>{
    this.setState({curr: e.target.value})
  }
  render(){
    var x=this.props.list
    var chat_list=<div></div>
    if(x!==undefined){
      chat_list= x.map(c=>{
      if(c.type===true){
      return(
      <div className="msg left-msg">
        <div className="msg-bubble">
          <div className="msg-text">
            {c.message}
          </div>
        </div>
      </div>   
      )}
      else{
        return(
        <div className="msg right-msg">
        <div className="msg-bubble">
          <div className="msg-text">
            {c.message}
          </div>
        </div>
      </div>
      )}   
    })
    }
    if(this.props.to.length>0){
    return(
    <div className='msger-box'>
    <div className="msger">
    <header className="msger-header">
      <div className="msger-header-title">
        {this.props.username}
      </div>
      <div className="msger-header-options">
        <button onClick={this.props.close}>X</button>
      </div>
    </header>

    <div className="msger-chat">
      {chat_list}
    </div>
    <form className="msger-inputarea" onSubmit={this.handleSend}>
      <input type="text" onChange={this.handleChange} className="msger-input" id='type-msg' placeholder="Enter your message..."/>
      <button type="submit" className="msger-send-btn">Send</button>
    </form>
    </div>
    </div>
    )
    }
    else{
      return(
        <div>
          Click on a username and message box will appear here
        </div>
      )
    }
  }
}
export default Message