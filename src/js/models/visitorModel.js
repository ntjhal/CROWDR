import { Fetcher } from "./fetcher.js";

export class VisitorModel {
    async getVisitor() {
        return await Fetcher.get('https://randomuser.me/api/');
    }
    
    async generateInfo(groupSize) {
        let url = `https://randomuser.me/api/?results=${groupSize}`;
        return await Fetcher.get(url);
    }
}

export class Visitor {
    constructor(firstname, lastname, gender, hometown, age) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.hometown = hometown;
        this.age = age;
    }
}

export class VisitorGroup {
    constructor(groupSize) {
        this.groupsize = groupSize;
        this.visitors = [];
    }

    addVisitor(visitor) {
        this.visitors.push(visitor);
    }
}
