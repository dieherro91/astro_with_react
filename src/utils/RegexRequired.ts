// 3-20 caracteres alfanuméricos, puntos, guiones y guiones bajos
export const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;

//Mínimo 8 caracteres, al menos una letra mayúscula, una letra minúscula y un número
export const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// validacion email
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const simpleRegex = /^[A-Za-z]+\d+$/;
