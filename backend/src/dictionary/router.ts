import express from 'express';
import dictionaryController from './controller'
const routerDictionary = express.Router();

routerDictionary.post('/dictionary-entry', dictionaryController.createDictionaryEntry);
routerDictionary.get('/translation/:language/:word', dictionaryController.getTranslationByLanguage);


export default routerDictionary;
