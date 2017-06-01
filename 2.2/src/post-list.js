import React from 'react';

function Post(props) {
    return (
        <div className="row">
            <h3>{props.title.rendered}</h3>
            <div dangerouslySetInnerHTML={{__html: props.content.rendered}} />
        </div>
    );
}

export default function PostList(props) {
    let posts = props.posts.map((post, index) => <Post key={index} {...post} />);

    return (
        <div>{posts}</div>
    );
}