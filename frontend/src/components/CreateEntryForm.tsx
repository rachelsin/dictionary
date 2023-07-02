import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../store/hooks'
import { createTranslate } from '../store/slice/createTranslateSlice';
import { getSupportedLanguages } from '../store/slice/translateSlice';
import { Form } from 'react-bootstrap';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';

interface Translation {
    language: string;
    translation: string;
}

interface FormData {
    english: string;
    translations: Translation[];
}

const CreateEntryForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const validationSchema = yup.object().shape({
        english: yup.string().required('English Word is required'),
        translations: yup
            .array()
            .of(
                yup.object().shape({
                    language: yup.string().required('Language is required'),
                    translation: yup.string().required('Translation is required'),
                })
            )
            .required('At least one translation is required.'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        setValue,
        control,
    } = useForm<FormData>({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
        defaultValues: {
            english: '',
            translations: [{ language: '', translation: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'translations',
    });

    useEffect(() => {
        dispatch(getSupportedLanguages())
    }, []);

    const supportedLanguages = useAppSelector((state) => state.translation.supportedLanguages)
    const success = useAppSelector((state) => state.createTranslate.success)
    const error = useAppSelector((state) => state.createTranslate.error)

    const selectedLanguages = fields.map((field) => field.language);

    const getAvailableLanguages = (index: number) => {
        const selectedLanguagesExceptIndex = selectedLanguages.filter((language, i) => i !== index);
        return supportedLanguages.filter((language) => !selectedLanguagesExceptIndex.includes(language));
    };


    const onSubmit = (data: FormData) => {
        dispatch(createTranslate(data));
    };

    useEffect(() => {
        if (success) {
            toast.success('Entry created successfully!');

        } else if (success === false && success !== null) {
            toast.error('Error creating entry');
        }
    }, [success])


    return (
        <div className='m-5'>
            <h2 className='display-6'>Create Dictionary Entry</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='col-7'>
                        <label htmlFor="englishInput">English Word:</label>
                        <Controller
                            name="english"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <input
                                    className={`form-control my-2 ${errors.english ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="englishInput"
                                    {...field}
                                />
                            )}
                        />
                        {errors.english && (
                            <div className='invalid-feedback'>{errors.english.message}</div>
                        )}
                    </div>
                </div>
                <div>
                    <p className=''>Translations:</p>
                    {fields.length === 0 ? (
                        <div className='error-massage text-danger'>At least one translation is required.</div>
                    ) : ''}
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            <div className="row mb-3">
                                <div className='col'>
                                    <Controller
                                        name={`translations.${index}.language`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <Form.Select
                                                id={`translationLanguageInput-${index}`}
                                                aria-label='Default select example'
                                                {...field}
                                                className={`form-control ${errors.translations && errors.translations[index]?.language ? 'is-invalid' : ''}`}
                                            >
                                                <option value=''>Language</option>
                                                {getAvailableLanguages(index).map((language) => (
                                                    <option key={language} value={language}>
                                                        {language.charAt(0).toUpperCase() + language.slice(1)}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        )}
                                    />

                                    {errors.translations && errors.translations[index]?.language && (
                                        <>
                                            {console.log((errors.translations[index]?.language as any)?.message)}
                                            <div className='invalid-feedback'>{(errors.translations[index]?.language as any)?.message}</div>
                                        </>
                                    )}
                                </div>
                                <div className='col'>
                                    <Controller
                                        name={`translations.${index}.translation`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <input
                                                className={`form-control ${errors.translations && errors.translations[index]?.translation ? 'is-invalid' : ''}`}
                                                placeholder='Translation:'
                                                type='text'
                                                {...field}
                                            />
                                        )}
                                    />
                                    {errors.translations && errors.translations[index]?.translation && (
                                        <div className='invalid-feedback'>{(errors.translations[index]?.translation as any)?.message}</div>
                                    )}
                                </div>
                                <div className='col-1'>
                                    <i className='bi bi-trash3 bigIcon' onClick={() => remove(index)}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-4'>
                    <button type="button" className='btn btn-secondary' onClick={() => append({ language: '', translation: '' })}>
                        Add Translation
                    </button>
                    <button type="submit" className='btn btn-success mx-3' disabled={fields.length === 0}>Create Entry</button>
                </div>
            </form>
        </div>
    );
};

export default CreateEntryForm;
