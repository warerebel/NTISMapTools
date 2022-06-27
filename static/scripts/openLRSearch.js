// NTISMapTools - Map interface to interact with NTIS data
// Copyright (C) 2021 Highways England
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

"use strict";

/* global L openlrmapdiv document fetch bootstrap*/

(function(){

    let geoJsonLayer;

    /**
     * Our search box which extends a leaflet map control
     * @class mapSearchBox
     */
    class mapSearchBox extends L.Control {

        constructor(){
            super();
        }

        onAdd(){
            return document.getElementById("openlrsearchcontrol");
        }
    }

    const myMapSearch = new mapSearchBox();
    myMapSearch.setPosition("topleft");
    myMapSearch.addTo(openlrmapdiv);

    const button = document.getElementById("openlrmapSearchButton");

    button.addEventListener("click", async function(){
        if(geoJsonLayer)
            openlrmapdiv.removeLayer(geoJsonLayer);
        const textBox = document.getElementById("openlrmapSearchBar");
        const openLRRef =encodeURIComponent(textBox.value);
        console.log("Fetching");
        const result = await fetch("/openlr/decode?reference=" + openLRRef);
        const geoJSON = await result.json();
        if(geoJSON.type && geoJSON.type === "FeatureCollection"){
            geoJsonLayer = L.geoJSON(geoJSON).addTo(openlrmapdiv);
            const polygon = getPolygon(geoJSON);
            openlrmapdiv.fitBounds(polygon);
        }
        else {
            const modal = document.getElementById("noLRResult");
            new bootstrap.Modal(modal).show();
        }
        
    });

    function getPolygon(geoJSON){
        let Top = -180;
        let Left = 180;
        let Bottom = 180;
        let Right = -180;
        for (const feature of geoJSON.features) {
            if (feature.geometry.coordinates[0][0][1] > Top)
                Top = feature.geometry.coordinates[0][0][1];
            if (feature.geometry.coordinates[0][0][1] < Bottom)
                Bottom = feature.geometry.coordinates[0][0][1];
            if (feature.geometry.coordinates[0][0][0] > Right)
                Right = feature.geometry.coordinates[0][0][0];
            if (feature.geometry.coordinates[0][0][0] < Left)
                Left = feature.geometry.coordinates[0][0][0];
        }
        const paddingValue = 0.0005;
        Top = Top + paddingValue;
        Bottom = Bottom - paddingValue;
        Left = Left - paddingValue;
        Right = Right + paddingValue;
        const corner1 = L.latLng(Top, Left);
        const corner2 = L.latLng(Bottom, Right);
        return L.latLngBounds(corner1, corner2);
    
    }

})();
