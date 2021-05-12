import React from 'react'
import './styles/header.css'

class Header extends React.Component {
    handleLogout=()=>{
        this.props.logout()
    }
    render(){
    return(
        <nav>
        <div className="nav">
            <ul>
            <li><a href='/'>Let's Chat</a></li>
            <li style={{float: 'right'}}><button style={{backgroundColor: 'transparent',color: 'white',borderColor: 'white'}} onClick={this.handleLogout}>Logout</button></li>
            <li style={{float: 'right'}}><a href="/">Home</a></li>
            </ul>
        </div>
        </nav>
    )}
}
export default Header