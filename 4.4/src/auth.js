import React from 'react';
import {Route, Redirect, Link} from 'react-router-dom';
import Api from './api';

function store(value) {
    const tokenKey = 'ApiTokenValue';
    if (value === undefined) {
        return sessionStorage.getItem(tokenKey);
    }

    sessionStorage.setItem(tokenKey, value);
}

const auth = {
    get isAuthenticated() {
        return store() !== null;
    },
    authenticate(username, password, fn) {
        let api = new Api();
        api.authenticate(username, password).then(obj => {
            store(obj.token);
            fn();
        }).catch(error => {
            // TODO: do something with error
        });
    },
    signout(fn) {
        store(null);
        fn();
    }
};

function LoginLink(props) {
    return auth.isAuthenticated ? null : <li><Link to="/login">Login</Link></li>;
}

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectTo: false,
            username: null,
            password: null
        };

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    login() {
        auth.authenticate(this.state.username, this.state.password, () => {
            this.setState({redirectTo: true});
        });
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const id = target.id;

        this.setState({
            [id]: value
        });
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to="/" />;
        }

        return (
            <div className="row">
                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input type="text" className="form-control" id="username" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={this.handleChange} />
                </div>

                <button type="submit" className="btn btn-default" onClick={this.login}>Login</button>
            </div>
        );
    }
}

function DeletePostLink(props) {
    if (auth.isAuthenticated) {
        return <Link to={`/post/delete/${props.id}`}>Delete Post</Link>;
    } 
    
    return null;
}

class DeletePost extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectTo: false
        };

        this.deletePost = this.deletePost.bind(this);        
    }

    deletePost() {
        let api = new Api();

        api.deletePost(store(), this.props.match.params.id).then(obj => {
            this.setState( {
                redirectTo: true
            });
        }).catch (error => {
            // TODO: handle error
        });
    }

    render() {
        if (!auth.isAuthenticated) {
            return <Redirect to="/login" />;
        }

        if (this.state.redirectTo) {
            return <Redirect to="/" />;
        }

        this.deletePost();

        return null;
    }
}


export {auth, LoginLink, LoginForm, DeletePostLink, DeletePost};