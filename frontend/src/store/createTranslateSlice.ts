import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
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
        const res = await axios.post('http://localhost:9000/dictionary/dictionary-entry', data);
        const result = await res.data
        return result;
    }
);


export const translateSlice = createSlice({
    name: 'translate',
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
            state.error = action.error.message
        })
    },
})

// export const { increment, decrement, incrementByAmount } = translateSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default translateSlice.reducer