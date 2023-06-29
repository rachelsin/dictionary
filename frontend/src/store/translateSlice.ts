import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import axios from 'axios'

interface TranslateState {
    word: string,
    language: string,
    translation: string |null,
    loading: boolean,
    error: string | undefined,
}

const initialState: TranslateState = {
    word: '',
    language: 'english',
    translation: null,
    loading: false,
    error: undefined,
}

export const getTranslate = createAsyncThunk(
    'translate/fetchByLanguageAndWord',
    async ({ language, word }: { language: string; word: string }, thunkAPI) => {
        const res = await axios.get(
            `http://localhost:9000/dictionary/translation/${language}/${word}`
        );
        const data = await res.data
        return data;
    }
);


export const translateSlice = createSlice({
    name: 'translate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTranslate.pending, (state) => {
            state.loading = true
            state.translation = null
        })
        builder.addCase(getTranslate.fulfilled, (state, action) => {
            state.loading = false
            state.translation = action.payload
        }) 
        builder.addCase(getTranslate.rejected, (state, action) => {
            state.loading = false
            state.translation = null
            state.error = action.error.message
        })
    },
})

// export const { increment, decrement, incrementByAmount } = translateSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default translateSlice.reducer