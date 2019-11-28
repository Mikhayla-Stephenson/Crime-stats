import React from 'react';

/* 
  Component renders Authentification forms
  - Child to AuthentificationForms Component
*/
class SignInBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="backdrop">
				<div className="container">
					<form onSubmit={this.handleSubmit} className="white">
						<div className="inputField">
							<h3 style={{ color: this.props.colour }}>
								<u>{this.props.title}</u>
							</h3>
							<h1 className="glyphicon glyphicon-user" />

							<div className="AuthentificationForm">
								<label style={{ color: this.props.colour }} htmlFor="email">
									{' '}
									Email{' '}
								</label>
								<input
									id="email"
									type="text"
									placeholder="Email"
									name="Email"
									onChange={this.props.handleChangeEmail}
									required
								/>
							</div>

							<div className="AuthentificationForm">
								<label style={{ color: this.props.colour }}> Password </label>
								<input
									id="passwod"
									type="password"
									placeholder="Password"
									name="password"
									onChange={this.props.handleChangePassword}
									required
								/>
							</div>

							<button type="button" className="log-btn2" onClick={this.props.handleSubmit}>
								Submit
							</button>
							<button type="button" className="log-btn2" onClick={this.props.toggleHide}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

//Create Authentification buttons and Authentification form functions
// Here, the SignInBox component will be called

class AuthentificationForms extends React.Component {
	constructor() {
		super();
		this.toggleSignIn = this.toggleSignIn.bind(this);
		this.toggleSignUp = this.toggleSignUp.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleSignIn = this.handleSignIn.bind(this);
		this.signOut = this.signOut.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);

		this.state = {
			signIn: true,
			signUp: true,
			email: '',
			password: '',
			colour: 'black',
			signInColour: 'black'
		};
	}

	//Functions to aid conditional rendering of register/signup forms
	toggleSignIn() {
		this.setState({
			signIn: !this.state.signIn
		});
		this.setState({ signInColour: 'black' });
	}
	toggleSignUp() {
		this.setState({
			signUp: !this.state.signUp
		});
		this.setState({ colour: 'black' });
	}

	successfulRegister() {
		this.setState({ signUp: true });
		this.setState({ signIn: false });
	}

	// Functions to update email and password
	handleChangeEmail(e) {
		this.setState({ email: e.target.value });
	}

	handleChangePassword(e) {
		this.setState({ password: e.target.value });
	}
	//function to register
	handleRegister(e) {
		let email = encodeURIComponent(this.state.email);
		let password = encodeURIComponent(this.state.password);
		let bodyContent = 'email=' + email + '&password=' + password;

		// "http://cab230.hackhouse.sh/register
		// http://localhost:8000/register
		fetch('http://localhost:8000/register', {
			method: 'POST',
			body: bodyContent,
			headers: {
				'Content-type': 'application/x-www-form-urlencoded'
			}
		})
			.then(function(response) {
				if (response.ok) {
					console.log('Registration successful');
				} else {
					throw new Error('Oops! Something went wrong!');
				}
			})
			.then(() => {
				console.log('check');
				this.setState({ signUp: !this.state.signUp });
				this.setState({ signIn: !this.state.signIn });
				this.setState({ colour: 'black' });
			})
			.catch(function(error) {
				console.log('Oops! Something went wrong, try again!');
			})
			.then(() => {
				this.setState({ colour: 'red' });
			});
	}

	//Function to sign a user in
	handleSignIn() {
		let email = encodeURIComponent(this.state.email);
		let password = encodeURIComponent(this.state.password);

		let bodyContent = 'email=' + email + '&password=' + password;
		// http://localhost:8000/login
		fetch('http://localhost:8000/login', {
			method: 'POST',
			body: bodyContent,
			headers: {
				'Content-type': 'application/x-www-form-urlencoded'
			}
		})
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
				throw new Error('Network response was not ok.');
			})
			.then(function(result) {
				JWT = result.access_token;
				window.logged = true;
			})
			.then(() => {
				this.props.logged();
				this.setState({ signIn: !this.state.signIn });
				this.setState({ signInColour: 'black' });
			})
			.catch(function(error) {
				console.log('There has been a problem with your fetch operation: ', error.message);
			})
			.then(() => {
				this.setState({ signInColour: 'red' });
			});
	}

	// function to sign user out
	signOut() {
		this.props.logged();
		JWT = null;
	}

	render() {
		return (
			<div className="Banner" width="100%" height="200px">
				<div style={{ display: 'inline-block', width: '500px', marginLeft: '37%' }}>
					<h1>Crime Stats Queensland</h1>
				</div>

				<div style={{ float: 'right' }}>
					<button id="signUp" className="log-btn2" onClick={this.toggleSignUp.bind(this)}>
						Register
					</button>

					{!this.state.signUp && (
						<SignInBox
							title="Register"
							colour={this.state.colour}
							handleChangeEmail={this.handleChangeEmail.bind(this)}
							handleChangePassword={this.handleChangePassword.bind(this)}
							handleSubmit={this.handleRegister.bind(this)}
							toggleHide={this.toggleSignUp.bind(this)}
							signUp={this.state.signUp}
						/>
					)}

					{this.props.check && (
						<button className="log-btn2" onClick={this.signOut.bind(this)}>
							Log Out
						</button>
					)}

					{!this.props.check && (
						<button className="log-btn2" onClick={this.toggleSignIn.bind(this)}>
							Log In
						</button>
					)}

					{!this.state.signIn && (
						<SignInBox
							colour={this.state.signInColour}
							title="Log In"
							toggleHide={this.toggleSignIn.bind(this)}
							handleChangeEmail={this.handleChangeEmail.bind(this)}
							handleChangePassword={this.handleChangePassword.bind(this)}
							handleSubmit={this.handleSignIn.bind(this)}
							signIn={this.state.signIn}
							email={this.state.email}
							password={this.state.password}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default AuthentificationForms;
