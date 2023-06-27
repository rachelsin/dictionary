import { Request, Response } from 'express';
import { prisma } from '../app';
import { DictionaryEntry } from '@prisma/client';
import { supportedLanguages } from '../config/supportedLanguages';

const createDictionaryEntry = async (req: Request, res: Response): Promise<void> => {
    try {
        const { english, translations } = req.body;

        const unsupportedLanguages = translations
            .map((translation: { language: string; }) => translation.language.toLowerCase())
            .filter((language:string) => !supportedLanguages.includes(language));

        if (unsupportedLanguages.length > 0) {
            res.status(400).send(`Unsupported languages: ${unsupportedLanguages.join(', ')}`);
            return;
        }

        const result = await createDictionaryEntryWithTranslations(english, translations);

        if (result) {
            res.json(result);
        } else {
            res.status(500).send('Error creating DictionaryEntry');
        }
    } catch (error: any) {
        console.log('Error in createDictionaryEntry:', error.message);
        res.status(500).send('Error in createDictionaryEntry');
    }
};

const createDictionaryEntryWithTranslations = async (
    english: string,
    translations: { language: string; translation: string }[]
): Promise<DictionaryEntry | null> => {
    try {
        const createdDictionaryEntry = await prisma.dictionaryEntry.create({
            data: {
                english,
                translations: {
                    createMany: {
                        data: translations,
                    },
                },
            },
            include: {
                translations: true,
            },
        });

        return createdDictionaryEntry;
    } catch (error) {
        console.error('Error creating DictionaryEntry:', error);
        return null;
    }
};



const getTranslationByLanguage = async (req: Request, res: Response): Promise<void> => {    
    try {
        const { language, word } = req.params;        

        if (!supportedLanguages.includes(language.toLowerCase())) {
            res.status(400).send(`Unsupported language: ${language}`);
            return;
        }

        const translation = await retrieveTranslationByLanguage(language, word);

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

const retrieveTranslationByLanguage = async (language: string, word: string): Promise<string | null> => {
    try {
        const translation = await prisma.translation.findFirst({
            where: {
                language,
                dictionaryEntry: {
                    english: word,
                },
            },
        });

        return translation?.translation || null;
    } catch (error) {
        console.error('Error finding translation:', error);
        return null;
    }
};


export default {
    createDictionaryEntry,
    getTranslationByLanguage,
}