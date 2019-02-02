import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Subscribe } from 'unstated';
import config from '../../auth.config.json';
import loginContainer from '../loginContainer'

export default function () {

    return (
        <Subscribe to={[loginContainer]}>
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
