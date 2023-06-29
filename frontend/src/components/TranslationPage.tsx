import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './../store/hooks'
import { getTranslate } from '../store/translateSlice';
// import { getTranslate } from '../api/api';

const TranslationPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const translation = useAppSelector((state) => state.translation.translation)
    
    const [word, setWord] = useState('');
    // const [translation, setTranslation] = useState('');
    const [language, setLanguage] = useState('english'); // Initial language value

    const handleWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value);
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(getTranslate({language,word}))
    };

    return (
        <div className='border'>
            <h2>Translation Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="wordInput">Word in English:</label>
                    <input type="text" id="wordInput" value={word} onChange={handleWordChange} />
                </div>
                <div>
                    <label htmlFor="languageSelect">Language:</label>
                    <select id="languageSelect" value={language} onChange={handleLanguageChange}>
                        <option value="english">English</option>
                        <option value="french">french</option>
                        <option value="spanish">Spanish</option>
                        <option value="hebrew">hebrew</option>
                        {/* Add more language options as needed */}
                    </select>
                </div>
                <button type="submit">Get Translation</button>
            </form>
            {/* Rest of the code */}
            {translation ? translation : 'no'}
        </div>
    );
};

export default TranslationPage;
