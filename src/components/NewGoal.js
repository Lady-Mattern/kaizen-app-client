import React, { Component } from 'react';
import Nav from './Nav';
import Footer from './Footer';

export default class NewGoal extends Component {
    state = {
        goals: [],
		formInputs: {
            title: '',
            body: ''
        }
    };
    
	handleChange = event => {
		const updateInput = Object.assign(this.state.formInputs, { [event.target.id]: event.target.value });
		this.setState(updateInput);
	};
	handleSubmit = event => {
		event.preventDefault();
		fetch('http://localhost:3000/goals', {
			body: JSON.stringify(this.state.formInputs),
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
			},
		})
			.then(createdGoal => {
				return createdGoal.json();
			})
			.then(jsonedGoal => {
				this.setState({
					formInputs: {
                        title: '',
                        body: ''
					},
                    goals: [jsonedGoal, ...this.state.goals],
				});
			})
            .catch(error => console.log(error));  
    };
    
    redirect() {
        window.location.pathname = '/home';
    }

    render(){
        return(
            <div className="new">
            <Nav />
            <div className="new-main">
            <h2 className='new-h2'>Create new goal</h2>
            <form onSubmit={this.handleSubmit} className='new-form form-group'>
						
							<label htmlFor='title'>Title</label>
                            <input type='text' id='title' value={this.state.formInputs.title} onChange={this.handleChange}  className='form-group-item'/>
							<label htmlFor='body'>Body</label>
                            <input type='text' id='body' value={this.state.formInputs.body} onChange={this.handleChange}  className='form-group-item'/>
							<button type='submit' onClick={this.redirect} className='btn styled-btn'><span className='span'></span>
                            <span className='span'></span>
                            <span className='span'></span>
                            <span className='span'></span>Submit</button>
						</form>
                        </div>
            <Footer />
            </div>
        )
    }
}

