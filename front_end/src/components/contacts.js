import React from 'react'

class Contacts extends React.Component{
    constructor(props){
        super(props)
        this.state={contacts: [],btn: {backgroundColor: 'none',border: 'none',color: '#0074e1',_isMounted: true}}
    }
    get_all_contacts=()=>{
        fetch('/user/list',{
            method: 'get',
            headers: {
                except: this.props.from,
                'Content-type': 'application/json'
            }
        })
        .then(res=>{
            if(res.ok) return res.json()
        })
        .then(jsonres=>{
            this.setState({contacts: jsonres})
        })
        .catch(err=>console.log(err))
    }
    messageBox=(to_id,to_username)=>{
        this.props.messageBox(to_id,to_username)
    }
    render(){
        this.get_all_contacts()
        return(
                <ul style={{listStyle: 'none'}}>
                {this.state.contacts.map(c=> {
                    return(
                    
                    <div key={c._id}>
                    <button style={this.state.btn} onClick={() => { this.messageBox(c._id,c.username) }}>
                    <li style={{fontWeight: 'bold'}}>
                    {c.username}
                    </li>
                    </button>
                    <li style={{color:'#25274d'}}>{c.firstname} {c.lastname}</li>
                    <hr style={{  border: 0,
                            clear:'both',
                            display:'block',
                            backgroundColor: '#25274d',
                            height: '1px'}}/>
                    </div>
                )})}
                </ul>
        )
    }
}
export default Contacts