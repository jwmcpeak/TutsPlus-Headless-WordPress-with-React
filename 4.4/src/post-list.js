import React from 'react';
import {Link} from 'react-router-dom';
import Api from './api';
import {DeletePostLink} from './auth';

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            author: ''
        };
    }

    componentDidMount() {
        let api = new Api();

        api.posts({
            id: this.props.match.params.id
        }).then(data => {
            this.setState({
                title: data.title.rendered,
                content: data.content.rendered,
                author: data._embedded.author[0].name
            });
        });
    }

    render() {
        let post = this.state;
        let id = this.props.match.params.id;
        
        return (
            <div className="row">
                <h3>{post.title} <small>by {post.author}</small></h3>
                <div dangerouslySetInnerHTML={{__html: post.content}} />
                <DeletePostLink id={id} />
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
                <Link to={`/post/${post.id}`}>{post.title.rendered} <small>by {post._embedded.author[0].name}</small></Link>
            </h3>);

        return (
            <div>{posts}</div>
        );
    }
}

export {Post, PostList};