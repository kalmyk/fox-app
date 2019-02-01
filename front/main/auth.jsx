import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Subscribe, Container } from 'unstated';
import config from '../auth.config.json';

type UserRecord = {
    email: string,
    id: number
}

type LoginState = {
    isAuthenticated: boolean,
    user:UserRecord,
    token: string
}

class LoginContainer extends Container<LoginState> {

    state = { isAuthenticated: false, user:null, token: '' };

    logout () {
        this.setState({isAuthenticated: false, token: '', user: null})
    }

    googleResponse(response) {

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

}

export default function () {

    return (
        <Subscribe to={[LoginContainer]}>
            {login => (
                !!login.state.isAuthenticated ?
                (
                    <div className="Auth">
                        <div>
                            {login.state.user.email}
                        </div>
                        <div>
                            <GoogleLogout
                                buttonText="Logout"
                                onLogoutSuccess={ () => login.logout() }
                            />
                        </div>
                    </div>
                ) :
                (
                    <div className="Auth">
                        <GoogleLogin
                            clientId={config.GOOGLE_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={(response) => login.googleResponse(response)}
                            onFailure={(response) => login.googleResponse(response)}
                        />
                    </div>
                )
            )}
        </Subscribe>
    );
}
