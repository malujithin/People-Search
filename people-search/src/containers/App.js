import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../state';
import rootSaga from '../state/saga';
import '../styles/index.scss';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const App = ({ children }) => {
    return (
        <div className="ui-people">
            <Provider store={store}>
                {/* <Header /> */}
                {children}
            </Provider>
        </div>
    );
};

export default App;
