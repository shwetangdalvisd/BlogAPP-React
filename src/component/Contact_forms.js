import React ,{ Component } from 'react'


class Contact extends Component{
	constructor(props){
		super(props);
		this.state = { 
			username: '',
      		number: '',
      		showName: false
      	};

	}

	ChangeHandler = (event) =>{
		let nam = event.target.name;
    	let val = event.target.value;
    	this.setState({[nam]: val});
    }
    
	  handleSubmit = (event) => {
	    event.preventDefault();
	    this.setState({showName: true});
	  }

	  render() {
	    return (
	      <div>
	        <form onSubmit={this.handleSubmit}>
	          <p>Enter the Name</p>
	          <input type="text" name="username" onChange={this.ChangeHandler} value={this.state.username} />
	          <p>Enter the number</p>
	          <input type="text" name="number" onChange={this.ChangeHandler} value={this.state.number} />
	          <button type="submit" onClick={this.handleSubmit}>Submit</button>
	          {this.state.showName && <p>Entered name is {this.state.username} and number is {this.state.number}</p>}
	        </form>
	      </div>
	    );
	  }

}

export default Contact;
