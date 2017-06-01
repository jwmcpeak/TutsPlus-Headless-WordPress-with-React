import React from 'react';
import {PostList} from './post-list';
import Api from './api';

export default class CategoryPosts extends PostList {
    constructor() {
        super();
        this.state = {
            posts: []
        };
    }

    fetchData(categoryId) {
        let api = new Api();

        api.posts({
            category: categoryId
        }).then(data => {
            this.setState({
                posts: data
            });
        });
    }

    componentWillReceiveProps(newProps) {
        this.fetchData(newProps.match.params.id);
    }

    componentDidMount() {
        this.fetchData(this.props.match.params.id);
    }
}