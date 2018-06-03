import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import './index.scss';
import App from './App';
import CookScriptTable from './cookScriptTable/cookScriptTable';
import AddRecipeForm from './managmentRecipe/addRecipeComponent';
import Edit from './managmentRecipe/editRecipeComponent';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import store from './store';

const config = {
    apiKey: "AIzaSyBKQ57c7mhOc3LqQSEcWU0Jw9XGbYDzO3A",
    authDomain: "cook-32c1e.firebaseapp.com",
    databaseURL: "https://cook-32c1e.firebaseio.com",
    projectId: "cook-32c1e",
    storageBucket: "cook-32c1e.appspot.com",
    messagingSenderId: "334137925753"
};
const dataFirebase = firebase.initializeApp(config);
export default dataFirebase;


export const history = createBrowserHistory();

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <div>
                <App path="/" />
                <Switch>
                    <Route exact={true} path="/" component={CookScriptTable} />
                    <Route path="/add" component={AddRecipeForm} />
                    <Route path="/edit/:id" component={Edit} />
                </Switch>
            </div>
        </Router>
    </Provider>), document.getElementById('root'));
registerServiceWorker();
