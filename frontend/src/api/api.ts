import axios from 'axios';

export const createEntry = async (data: { english: string, translations: { language: string, translation: string }[] }) => {
    try {
        const response = await axios.post('http://localhost:9000/dictionary/dictionary-entry', data);
        console.log(response.data);
    } catch (error: any) {
        console.error(error);
    }
    // return axios.post('http://localhost:9000/dictionary/dictionary-entry', data).then(response => {
    //     console.log(response.data); 
    // })
    //     .catch(error => {
    //         console.error(error);
    //     });
};
export const getTranslate = async (language: string, word:string) => {
    try {
        const response = await axios.get(`http://localhost:9000/dictionary/translation/${language}/${word}`);
        console.log(response.data);
    } catch (error: any) {
        console.error(error);
    }
    // return axios.post('http://localhost:9000/dictionary/dictionary-entry', data).then(response => {
    //     console.log(response.data); 
    // })
    //     .catch(error => {
    //         console.error(error);
    //     });
};
