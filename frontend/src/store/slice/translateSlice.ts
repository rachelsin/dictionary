import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface TranslateState {
    word: string,
    language: string,
    translation: string | null | boolean,
    loading: boolean,
    error: string | undefined,
    supportedLanguages: string[]
}

const initialState: TranslateState = {
    word: '',
    language: 'english',
    translation: null,
    loading: false,
    error: undefined,
    supportedLanguages: []
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
export const getSupportedLanguages = createAsyncThunk(
    'translate/getSupportedLanguages',
    async () => {
        const res = await axios.get(
            `http://localhost:9000/dictionary/supportedLanguages`
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
            state.translation = false
            state.error = action.error.message
        })
        builder.addCase(getSupportedLanguages.pending, (state) => {
            state.loading = true
            state.supportedLanguages = []
        })
        builder.addCase(getSupportedLanguages.fulfilled, (state, action) => {
            state.loading = false
            state.supportedLanguages = action.payload
        })
        builder.addCase(getSupportedLanguages.rejected, (state, action) => {
            state.loading = false
            state.supportedLanguages = []
            state.error = action.error.message
        })
    },
})

export default translateSlice.reducer