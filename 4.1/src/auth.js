import React from 'react';
import {Route, Redirect, Link} from 'react-router-dom';

let _isAuthenticated = false;

const auth = {
    get isAuthenticated() {
        return _isAuthenticated;
    },
    authenticate(fn) {
        _isAuthenticated = true;
        setTimeout(fn, 100);
    },
    signout(fn) {
        _isAuthenticated = false;
        setTimeout(fn, 100);
    }
};

function LoginLink(props) {
    return auth.isAuthenticated ? null : <li><Link to="/login">Login</Link></li>;
}

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectTo: false
        };

        this.login = this.login.bind(this);
    }

    login() {
        auth.authenticate(() => {
            this.setState({redirectTo: true});
        })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to="/" />;
        }

        return (
            <div className="row">
                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input type="text" className="form-control" id="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-default" onClick={this.login}>Login</button>
            </div>
        );
    }
}

function DeletePost(props) {
    if (auth.isAuthenticated) {
        return <Link to={`/post/delete/${props.id}`}>Delete Post</Link>;
    } 
    
    return null;
    
}


export {auth, LoginLink, LoginForm, DeletePost};