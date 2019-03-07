import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { configureStore, history } from './store/configureStore';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './app.global.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store} context={ReactReduxContext}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));


