const BASE_URL = 'http://localhost:8083/quesmarkt-base/admin';

export const apiCall = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: object
): Promise<any> => {
    let init: any = {
        method,
        headers: {
            'Content-Type': 'application/json',
            // Add other headers if needed (e.g., Authorization)
        },
        body: body ? JSON.stringify(body) : undefined,
    };

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

