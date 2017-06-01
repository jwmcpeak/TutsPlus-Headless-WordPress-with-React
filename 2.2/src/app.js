import Api from './api';
import React from 'react';
import ReactDOM from 'react-dom';
import PostList from './post-list';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        let api = new Api();

        api.posts().then(data => {
            this.setState({
                posts: data
            });
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Welcome to Headless WordPress!</h1>
                <PostList posts={this.state.posts} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-container'))