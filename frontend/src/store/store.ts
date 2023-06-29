import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import translationReducer from './translateSlice';
import createTranslateReducer from './createTranslateSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        translation: translationReducer,
        createTranslate: createTranslateReducer
    },
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
