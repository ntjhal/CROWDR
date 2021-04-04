export class Fetcher {
    static async get(url) {
        return fetch(url)
            .then(res => res.json())
            .catch(e => {
                throw 'API connection failed!';
            });
    }
}
