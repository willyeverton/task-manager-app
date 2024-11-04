import admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_PATH is not defined in .env file');
}

// Resolva o caminho absoluto para garantir que o arquivo seja encontrado
const serviceAccount = require(path.resolve(serviceAccountPath));

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} catch (error) {
    const err = error as Error;
    throw new Error('Erro ao inicializar o Firebase: ' + err.message);
}

export const firestore = admin.firestore();
export const auth = admin.auth();
