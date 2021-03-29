export class Placeable {
    constructor(width, height) {
        this.x = undefined;
        this.y = undefined;
        this.width = width;
        this.height = height;
    }
}

export class ParkObject extends Placeable{
    constructor(id, type, imgsrc, width, height) {
        super(width, height)
        this.id = id;
        this.type = type;
        this.imagesrc = imgsrc;
        this.idname = 'parkobject-'.id; 
    }
}

