import React, { useState } from 'react';
import { createEntry } from '../api/api';
import { useAppDispatch, useAppSelector } from './../store/hooks'
import { createTranslate } from '../store/createTranslateSlice';

interface Translation {
    language: string;
    translation: string;
}

const CreateEntryForm: React.FC = () => {
    const dispatch = useAppDispatch()

    const [english, setEnglish] = useState('');
    const [translations, setTranslations] = useState<Translation[]>([]);

    const handleEnglishChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnglish(event.target.value);
    };

    const handleTranslationChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedTranslations = [...translations];
        updatedTranslations[index] = {
            ...updatedTranslations[index],
            translation: event.target.value,
        };
        setTranslations(updatedTranslations);
    };

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedTranslations = [...translations];
        updatedTranslations[index] = {
            ...updatedTranslations[index],
            language: event.target.value,
        };
        setTranslations(updatedTranslations);
    };

    const handleAddTranslation = () => {
        setTranslations([...translations, { language: '', translation: '' }]);
    };

    const handleRemoveTranslation = (index: number) => {
        const updatedTranslations = [...translations];
        updatedTranslations.splice(index, 1);
        setTranslations(updatedTranslations);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {
                english,
                translations,
            };
        dispatch(createTranslate(formData))
        // try {
        //     const formData = {
        //         english,
        //         translations,
        //     };
        //     const response = await createEntry(formData).then(res=>console.log('s',res) );
        //     // console.log('hi', response);

        // } catch (error) {
        //     // Handle any error that occurred during the API call
        // }
    };

    return (
        <div>
            <h2>Create Dictionary Entry</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="englishInput">English Word:</label>
                    <input
                        type="text"
                        id="englishInput"
                        value={english}
                        onChange={handleEnglishChange}
                    />
                </div>
                <div>
                    <h3>Translations:</h3>
                    {translations.map((translation, index) => (
                        <div key={index}>
                            <label htmlFor={`translationLanguageInput-${index}`}>Language:</label>
                            <input
                                type="text"
                                id={`translationLanguageInput-${index}`}
                                value={translation.language}
                                onChange={(event) => handleLanguageChange(event, index)}
                            />
                            <label htmlFor={`translationInput-${index}`}>Translation:</label>
                            <input
                                type="text"
                                id={`translationInput-${index}`}
                                value={translation.translation}
                                onChange={(event) => handleTranslationChange(event, index)}
                            />
                            <button type="button" onClick={() => handleRemoveTranslation(index)}>
                                Remove Translation
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddTranslation}>
                        Add Translation
                    </button>
                </div>
                <button type="submit">Create Entry</button>
            </form>
        </div>
    );
};

export default CreateEntryForm;
