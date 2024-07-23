import type { ErrorHandlerType } from '@customTypes/utilsTypes/ErrorHandler';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ErrorHandler = (error: any): ErrorHandlerType => {
    let messageError = 'Error en interfaz';
    console.error('error: ', error);

    if (error) {
        if (typeof error === 'string') {
            messageError = error;
        }
        if (error?.message && typeof error?.message === 'string') {
            messageError = error?.message;
        }
    }
    return {
        message: messageError,
    };
};
