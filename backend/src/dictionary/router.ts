import express from 'express';
import dictionaryController from './controller'
const routerDictionary = express.Router();

routerDictionary.post('/dictionaryEntry', dictionaryController.createDictionaryEntry);
routerDictionary.get('/translation/:language/:word', dictionaryController.getTranslationByLanguage);
routerDictionary.get('/supportedLanguages', dictionaryController.getSupportedLanguages);


export default routerDictionary;
