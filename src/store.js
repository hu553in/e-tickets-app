import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore,
} from 'react-redux-i18n';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';
import translationObject from './translationObject';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationObject));
store.dispatch(setLocale(process.env.REACT_APP_LOCALE));

export default store;
