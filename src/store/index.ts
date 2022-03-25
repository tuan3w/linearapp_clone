import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import ReduxThunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import issueReducer from './reducers/issueReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [''],
};

let rootReducer = combineReducers({
  issues: issueReducer,
});
const middlewares = [ReduxThunk];

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
