import fs from 'fs';
import { resolve } from 'path';
import Ilanguages from '../ts/interfaces/ILanguages';

const language = async (lang: 'pt-br' = 'pt-br') => {
    const file: Ilanguages = await JSON.parse(fs.readFileSync(resolve(__dirname, '..', '..', 'languages', `${lang}.json`), 'utf-8'));
    return file;
};

export default language;
