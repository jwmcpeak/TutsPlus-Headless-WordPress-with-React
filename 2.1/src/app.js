import Api from './api';
import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {

    render() {
        return (
            <div className="container">
                <h3>Hello, Headless WordPress!</h3>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app-container'));