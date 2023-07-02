import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface CreateTranslateState {
    loading: boolean,
    error: string | undefined,
    success: null| boolean
}

const initialState: CreateTranslateState = {
    loading: false,
    error: undefined,
    success:null
}

export const createTranslate = createAsyncThunk(
    'createTranslate/createTranslateBywordAndLanguage',
    async (data: { english: string, translations: { language: string, translation: string }[] }) => {
        const res = await axios.post('http://localhost:9000/dictionary/dictionaryEntry', data);
        const result = await res.data
        return result;
    }
);


export const translateSlice = createSlice({
    name: 'createTranslate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTranslate.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createTranslate.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(createTranslate.rejected, (state, action) => {
            state.loading = false
            state.success = false
        })
    },
})

export default translateSlice.reducer