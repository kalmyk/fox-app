import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from './auth.config.json';

export default class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isAuthenticated: false, user: null, token: ''};
        this.googleResponse = this.googleResponse.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout () {
        this.setState({isAuthenticated: false, token: '', user: null});
    }
    
    googleResponse(response) {

        this.setState({user:{email:'TO-BE-DEFINED'}});

        const tokenBlob = new Blob(
            [JSON.stringify({access_token: response.accessToken},null, 2)],
            {type : 'application/json'}
        );
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:9000/auth/v1/google', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token});
                }
            });
        })
    }

    render() {
        let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <GoogleLogout
                            buttonText="Logout"
                            onLogoutSuccess={this.logout}
                        />
                    </div>
                </div>
            ) :
            (
                <div>
                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
                </div>
            );

        return (
            <div className="Auth">
                {content}
            </div>
        );
    }
}
