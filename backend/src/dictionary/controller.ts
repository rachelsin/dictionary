import { Request, Response } from 'express';
import { supportedLanguages } from '../config/supportedLanguages';
import dictionaryService from './service';


const createDictionaryEntry = async (req: Request, res: Response): Promise<void> => {
    try {
        const { english, translations } = req.body;
        
        const unsupportedLanguages = translations
            .map((translation: { language: string; }) => translation.language.toLowerCase())
            .filter((language: string) => !supportedLanguages.includes(language));
        if (unsupportedLanguages.length > 0) {
            res.status(400).send(`Unsupported languages: ${unsupportedLanguages.join(', ')}`);
            console.log('status 400');

            return;
        }
        const result = await dictionaryService.createDictionaryEntryWithTranslations(english, translations);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(500).send('Error creating DictionaryEntry');
        }
    } catch (error: any) {
        console.log('Error in createDictionaryEntry:', error.message);
        res.status(500).send('Error in createDictionaryEntry');
    }
};

const getTranslationByLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { language, word } = req.params;
        if (!supportedLanguages.includes(language.toLowerCase())) {
            res.status(400).send(`Unsupported language: ${language}`);
            return;
        }
        const translation = await dictionaryService.retrieveTranslationByLanguage(language, word);
        if (translation) {
            res.json(translation);
        } else {
            res.status(404).send('Translation not found');
        }
    } catch (error: any) {
        console.log('Error in getTranslationByLanguage:', error.message);
        res.status(500).send('Error in getTranslationByLanguage');
    }
};

const getSupportedLanguages = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).send(supportedLanguages);
    } catch (error: any) {
        console.log('Error in getSupportedLanguages:', error.message);
        res.status(500).send('Error in getSupportedLanguages');
    }
};


export default {
    createDictionaryEntry,
    getTranslationByLanguage,
    getSupportedLanguages,
}