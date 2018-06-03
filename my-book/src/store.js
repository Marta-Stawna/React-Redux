import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cookScriptReducer from './stateManagment/cookScriptReducer';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

const store = createStore(combineReducers({
    cookScriptReducer,
    form: formReducer,
}), {}, applyMiddleware(thunk));

export default store;
