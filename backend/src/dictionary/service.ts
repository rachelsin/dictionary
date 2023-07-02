import { prisma } from '../app';
import { DictionaryEntry } from '@prisma/client';

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

const createDictionaryEntryWithTranslations = async (
    english: string,
    translations: { language: string; translation: string }[]
): Promise<DictionaryEntry | null> => {
    try {
        let existingEntry: DictionaryEntry | null = await prisma.dictionaryEntry.findUnique({
            where: {
                english: english,
            },
            include: {
                translations: true,
            },
        });

        if (existingEntry) {
            const createdTranslations = await prisma.translation.createMany({
                data: translations.map((translation) => ({
                    language: translation.language,
                    translation: translation.translation,
                    dictionaryEntryId: existingEntry!.id,
                })),
            });

            existingEntry = await prisma.dictionaryEntry.findUnique({
                where: {
                    id: existingEntry!.id,
                },
                include: {
                    translations: true,
                },
            }) as DictionaryEntry;

            return existingEntry;
        } else {
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
        }
    } catch (error) {
        console.error('Error creating DictionaryEntry:', error);
        return null;
    }
};

export default {
    retrieveTranslationByLanguage,
    createDictionaryEntryWithTranslations
}