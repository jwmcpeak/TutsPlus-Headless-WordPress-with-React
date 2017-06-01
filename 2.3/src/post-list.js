import React from 'react';
import {Link} from 'react-router-dom';
import Api from './api';

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: ''
        };
    }

    componentDidMount() {
        let api = new Api();

        api.posts(this.props.match.params.id).then(data => {
            this.setState({
                title: data.title.rendered,
                content: data.content.rendered
            });
        });
    }

    render() {
        let post = this.state;

        return (
            <div className="row">
                <h3>{post.title}</h3>
                <div dangerouslySetInnerHTML={{__html: post.content}} />
            </div>
        );
    }
}

class PostList extends React.Component {
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
        let posts = this.state.posts.map((post, index) => 
            <h3 key={index}>
                <Link to={`/post/${post.id}`}>{post.title.rendered}</Link>
            </h3>);

        return (
            <div>{posts}</div>
        );
    }
}

export {Post, PostList};