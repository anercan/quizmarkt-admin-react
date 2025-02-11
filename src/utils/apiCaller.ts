const BASE_URL = 'https://api.quizmarkt.com/quizmarkt-base/admin';

//const BASE_URL = 'http://localhost:9092/quizmarkt-base/admin';

export const apiCall = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: object
): Promise<any> => {

    let init: any = {
        method,
        headers: {
            'Referrer-Policy': 'no-referrer',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'http://localhost:3000'
        },
        body: body ? JSON.stringify(body) : undefined,
    };

    let authToken = await localStorage.getItem('auth');
    init.headers['Authorization'] = `Bearer ${authToken}`;

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, init);
            const result = await response.json();
            console.log(result);
            resolve(result);
        } catch (error:any) {
            console.error('API Call Error:', error.message);
            reject(error);
        }
    });
};

