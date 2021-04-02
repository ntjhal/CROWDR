export class VisitorModel {
    async generateInfo(groupSize) {
        return fetch("https://randomuser.me/api/?results="+groupSize)
            .then(res => res.json())
            .catch(e => {
                throw e;
        });
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

