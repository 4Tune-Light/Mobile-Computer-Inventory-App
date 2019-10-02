
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './reducers'
import rpm from 'redux-promise-middleware'
import { createLogger } from 'redux-logger';

const initState = {};

const logger = createLogger();

const middleware = [rpm, logger];

const store = createStore(
	rootReducers,
	initState,
	applyMiddleware(...middleware),
)


export default store;