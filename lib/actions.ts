/**
 * Esta parte del documento se encarga de hacer las llamadas
 * a la base de datos para el tema de la autentecación de usuario
 * en la cual se crea el cliente y se establecen las funciones 
 * 
 */

const isProduction = process.env.NODE_ENV === 'production';

/**
 * IMPORTANT
 * Change db enviroments
 */
const apiUrl = isProduction 
    ? process.env.NEXT_PUBLIC_DB_URL || ''
    : 'DB_URL_FOR_DEVELOPMENT';

const apiKey = isProduction
    ? process.env.NEXT_PUBLIC_DB_API_KEY || ''
    : 'secretkey';

const serverUrl = isProduction
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : 'http://localhost:3000/';


// --- Interfaces 
interface ICreateUser {
    name?: string;
    email?: string;
    avatarUrl?: string;
}

// --- Functions
export const getUser = ( email: string ) => {
    // Mandar parametros en los header si es necesario, ejemplo de GrapgQL
    // client.setHeader('x-api-key', apiKey );

    // Retornar el objeto de tipo UserProfile
    return ;
}

export const createUser = ({name = '', email = '', avatarUrl = ''}: ICreateUser) => {
    // Mandar parametros en los header si es necesario, ejemplo de GrapgQL
    // client.setHeader('x-api-key', apiKey );

    // Objeto a mandar
    const variables = {
        name,
        email,
        avatarUrl,
    };

    // Retornar el objeto de tipo UserProfile
    return;
}

