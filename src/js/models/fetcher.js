export class Fetcher {
    static async get(url) {
        return fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {    
                'Access-Control-Allow-Origin': '*' 
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw 'API connection failed!';
                }
                
                return res;
            })
            .then(res => res.json())
            .catch(e => {
                throw e;
            });
    }
}
