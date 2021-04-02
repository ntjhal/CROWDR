import { Region } from "../models/regionModel.js";

export class RegionController {
    constructor(view) {
        this.regionview = view;
        this.renderSimBtn = null;
    }

    createRegion() {
        //create a terrain, name must be unique
        let regions = this.getRegions();
        let newID;

        if(regions.length >= 6) {
            return null;
        } else if(regions.length > 0) {
            newID = Math.max.apply(Math, regions.map(function(r) { return r.id; })) + 1;
        } else {
            newID = 1;
        }

        let region = new Region(newID);
        this.saveRegion(region);

        this.currentRegionID = region.id;

        return region;
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
        if (region == null)
            return;
        
        let regions = this.getRegions();

        regions = regions.filter(r => r.id !== region.id);
        
        regions.push(region);

        function compare(a, b) {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        }

        regions.sort(compare);
        
        localStorage.setItem('regions', JSON.stringify(regions));
    }

    getRegion(id) {
        if (id == null)
            return;
        //Get the terrain using the name
        let regionsArray = this.getRegions();

        return regionsArray.filter(r => r.id === id)[0];
    }

    setSimRegion(value) {
        this.simCurrentRegionID = value;
        return this.getRegion(this.simCurrentRegionID);
    }

    drawCreateRegions() {
        let regions = this.getRegions();
        let regionButtons = document.querySelector('#regionbuttons');
        regionButtons.innerHTML = "";
        
        for(let region of regions) {
            this.regionview.render(region);
        }
    }

    drawSimRegions() {
        let regions = this.getRegions();
        let regionButtons = document.querySelector('#sim_regionbuttons');
        regionButtons.innerHTML = "";
        
        for(let region of regions) {
            this.renderSimBtn(region);
        }
    }

    getCurrentSimRegionID() {
        return this.simCurrentRegionID;
    }

    getCurrentRegionID() {
        return this.currentRegionID;
    }
}
