export class VisitorModel {
    async generateInfo() {
        return fetch("https://randomuser.me/api/")
                .then(res => res.json())
    }
}