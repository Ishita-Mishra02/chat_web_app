import React from 'react'
import Message from './message'
import io from 'socket.io-client'
import Header from './header';
import Contacts from './contacts';
class Chat extends React.Component{
    _isMounted=false
    constructor(props){
        super(props);
        let x=this.props.data.user._id
        this.state= {user_id: x,
                    to: '',to_user:'',
                    list: {}}
        this.socket=io('http://localhost:5000/')
        if(x!=='null' && x!=='undefined'){
            this.socket.emit('INIT_CONNECTION', x);
        }
        this.socket.on('receive'+x, (data)=>{
            if(this._isMounted){
            //console.log(data)
            this.addMessage(data.message,data.from,true)
            }
        })
    }
    componentDidMount=()=> this._isMounted=true
    addMessage(m,id,t){
        var l1 =this.state.list
        let x=id.toString()
        if(l1[x]===null || l1[x]===undefined)
        {
            l1[x]=[]
        }
        l1[x].push({message: m,type: t})
        this.setState({list: l1})
    }
    handleSend=(message)=>{
        let id=this.state.to
        this.socket.emit('sendMessage', {message: message,from: this.state.user_id,to: id})
        this.addMessage(message,id,false)
    }
    messageBox=(to_id,to_username)=>{
        //console.log(to_id)
        this.setState({to: to_id, to_user: to_username})
    }
    closeWindow=()=>{
        this.setState({to: '',to_user:''})
        console.log(this.state.list)
    }
    componentWillUnmount=()=>{
        this._isMounted=false
    }
    render(){
        return (
            <div>
            <Header logout={this.props.logout}/>
            <div style={{flexDirection: 'row',display: 'flex',height: '100%',left: '5%',right: '5%'}}>
                <div style={{width: '20%', backgroundColor: '#ccebff'}}>
                    <Contacts from={this.state.user_id} messageBox={this.messageBox}/>
                </div>
                <div id='msg-box' style={{width: '60%'}}>
                <Message to={this.state.to} send={this.handleSend} username={this.state.to_user} close={this.closeWindow} list={this.state.list[this.state.to]}>
                </Message>
                </div>
            </div>
            </div>
        )
    }

}
export default Chat