const baseUrl = 'http://localhost/wp-json/wp/v2/';
const authUrl = 'http://localhost/wp-json/jwt-auth/v1'

export default class Api {

    posts(options = {}) {
        let url = `${baseUrl}posts`;

        if (options.id !== undefined) {
            url += `/${options.id}`;
        }

        url += '?_embed';

        if (options.category !== undefined) {
            url += `&categories=${options.category}`;
        }
        
        return fetch(url).then(res => res.json());
    }

    categories() {
        let url = `${baseUrl}categories`;

        // if (id !== undefined) {
        //     url += `/${id}`;
        // }
        
        return fetch(url).then(res => res.json());
    }

    authenticate(username, password) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return fetch(`${authUrl}/token`, {
            method: 'POST',
            headers,
            body: JSON.stringify({username, password})
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res.json();
        });
    }

    deletePost(token, id) {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);

        return fetch(`${baseUrl}posts/${id}`, {
            method: 'DELETE',
            headers
        }).then(res => {
            if (!res.ok) {
                throw Error(res.statusText);
            }

            return res.json();
        });
    }
}