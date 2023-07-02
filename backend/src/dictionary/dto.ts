import Joi from 'joi';
import { supportedLanguages } from '../config/supportedLanguages';

const schemaCreateDictionaryEntry = Joi.object({
    english: Joi.string().required(),
    translations: Joi.array()
        .items(
            Joi.object({
                language: Joi.string().valid(...supportedLanguages).required(),
                translation: Joi.string().required()
            })
        )
        .required()
});

const schemaTranslate = Joi.object({
    language: Joi.string().valid(...supportedLanguages).required(),
    word: Joi.string().required(),
});

export default {
    schemaCreateDictionaryEntry,
    schemaTranslate
}