'use strict';

import { Container } from 'unstated'

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

    googleResponse(response: any) {

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

export default new LoginContainer()
