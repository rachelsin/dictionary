import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './../store/hooks'
import { getSupportedLanguages, getTranslate } from '../store/slice/translateSlice';
import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

const TranslationPage: React.FC = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getSupportedLanguages())
    }, [])

    const translation = useAppSelector((state) => state.translation.translation)
    const supportedLanguages = useAppSelector((state) => state.translation.supportedLanguages)
    const [word, setWord] = useState('');
    const [language, setLanguage] = useState('');

    const handleWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value);
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(getTranslate({ language, word }))
    };

    return (
        <div className='container m-5'>
            <div className='container'></div>
            <h2 className='display-6 mb-5'>Dictionary</h2>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col sm={10} xs={10} md={10}>
                        <InputGroup className="mb-3 input-search">
                            <Form.Control aria-label="Text input with dropdown button" className='input-search-right' placeholder='Search English' value={word} onChange={handleWordChange} />
                            <Form.Select id="languageSelect" aria-label="Default select example"
                                value={language} onChange={handleLanguageChange}>
                                <option>Language</option>
                                {supportedLanguages.map((language) => (
                                    <option value={language}>{language.charAt(0).toUpperCase() + language.slice(1)}</option>
                                ))}
                            </Form.Select>
                            <Button variant="outline-secondary" id="button-addon2" className='input-search-left' type='submit'>
                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </form>
            {translation === null ? '' : (
                <div>
                    <p>Results:</p>
                    <Row>
                        <Col md={10}>
                            <Alert key='danger' variant={translation ? 'success' : 'danger'}>
                                {translation ? translation : 'No results found for your search'}
                            </Alert>
                        </Col>
                    </Row>
                </div>
            )}

        </div>
    );
};

export default TranslationPage;
