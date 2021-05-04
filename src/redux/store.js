import {createStore, applyMiddleware, combineReducers} from 'redux';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import {
//   createReduxContainer,
//   createReactNavigationReduxMiddleware,
//   createNavigationReducer,
// } from 'react-navigation-redux-helpers';

// const middleware = createReactNavigationReduxMiddleware(state => state.reducer);

const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
      'reducer',
    ],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: [

    ],
  };

const appReducers = combineReducers({
    reducer: reducer,
});

const persistedReducer = persistReducer(persistConfig, appReducers);

const store = createStore(
    persistedReducer,   
);

let persistor = persistStore(store);

export {
    store,
    persistor
};
