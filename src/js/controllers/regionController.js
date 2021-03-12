import { Region } from "../models/regionModel.js";

export class RegionController {

    createRegion() {
        //create a terrain, name must be unique
        let regions = this.getRegions()
        let newID;

        if(regions.length > 0) {
            newID = Math.max.apply(Math, regions.map(function(r) { return r.id; })) + 1;
        } else {
            newID = 1;
        }

        let region = new Region(newID);

        this.saveRegion(region);
    }

    getRegions() {
        //retrieve terrains from JSON in localstorage
        let regions = [];
        
        if(localStorage.regions !== undefined) {
            regions = JSON.parse(localStorage.regions)
        }

        let regionsArray = Object.keys(regions).map(function(k) { return regions[k] });

        return regionsArray;
    }

    saveRegion(region) {
        //convert terrains to JSON and store in localStorage
        let regions = this.getRegions();

        regions.push(region); 

        localStorage.setItem('regions', JSON.stringify(regions));
    }

    getRegion(id) {
        //Get the terrain using the name
        let regions = [];

        if(localStorage.regions !== undefined) {
            regions = JSON.parse(localStorage.regions)
        }
        
        let regionsArray = Object.keys(regions).map(function(k) { return regions[k] });

        return regionsArray.filter(r => r.id === id)[0];
    }
}