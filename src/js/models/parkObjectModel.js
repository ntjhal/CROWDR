export class Placeable {
    constructor() {
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
    }
}

export class ParkObject extends Placeable{
    constructor(id) {
        this.id = id;
        this.idname = 'parkobject-'.id; 
        super()
    }
}

