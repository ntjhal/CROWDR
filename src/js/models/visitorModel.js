export class VisitorModel {
    async generateInfo() {
        return fetch("https://randomuser.me/api/")
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