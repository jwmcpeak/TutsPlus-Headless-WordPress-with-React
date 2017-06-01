import Api from './api';
import React from 'react';
import ReactDOM from 'react-dom';
import  { HashRouter, Switch, Route } from 'react-router-dom';
import {PostList, Post} from './post-list';


class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Welcome to Headless WordPress!</h1>
                <Switch>
                    <Route exact path="/" component={PostList} />
                    <Route path="/post/:id" component={Post} />
                </Switch>
            </div>
        );
    }
}

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>, document.getElementById('app-container'))