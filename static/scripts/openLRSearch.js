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
        const resultTable = document.getElementById("openLR-result-table");
        const openLRRef =encodeURIComponent(textBox.value);
        console.log("Fetching");
        const result = await fetch("/openlr/decode?reference=" + openLRRef);
        const geoJSON = await result.json();
        if(geoJSON.type && geoJSON.type === "FeatureCollection"){
            const tableDOM = buildResultTable(geoJSON);
            resultTable.replaceChildren(tableDOM);
            geoJsonLayer = L.geoJSON(geoJSON).addTo(openlrmapdiv);
            const polygon = getPolygon(geoJSON);
            openlrmapdiv.fitBounds(polygon);
        }
        else {
            resultTable.replaceChildren(document.createElement("div"));
            const modal = document.getElementById("noLRResult");
            new bootstrap.Modal(modal).show();
        }
        
    });

    function buildResultTable(geoJSON){
        const seenLinks = [];
        const tableGrid = linkExtents(geoJSON);
        const table = document.createElement("table");
        table.classList.add("table");
        const tableHead = table.appendChild(document.createElement("thead"));
        const headRow = document.createElement("tr");
        headRow.appendChild(document.createElement("th")).textContent = "Way ID";
        headRow.appendChild(document.createElement("th")).textContent = "From Node";
        headRow.appendChild(document.createElement("th")).textContent = "To Node";
        tableHead.appendChild(headRow);
        table.appendChild(tableHead);
        const tableBody = document.createElement("tbody");
        for (const feature of geoJSON.features) {
            if(seenLinks.indexOf(feature.properties.openStreetMapWayId) === -1){
                const dataRow = document.createElement("tr");
                dataRow.appendChild(document.createElement("td")).textContent = feature.properties.openStreetMapWayId;
                dataRow.appendChild(document.createElement("td")).textContent = tableGrid[feature.properties.openStreetMapWayId].startNode;
                dataRow.appendChild(document.createElement("td")).textContent = tableGrid[feature.properties.openStreetMapWayId].endNode;
                tableBody.appendChild(dataRow);
                seenLinks.push(feature.properties.openStreetMapWayId);
            }
        }
        table.appendChild(tableBody);
        return table;
    }

    function linkExtents(geoJSON){
        const links = {};
        for(const feature of geoJSON.features){
            if(!links[feature.properties.openStreetMapWayId])
                links[feature.properties.openStreetMapWayId] = {
                    startNode: parseInt(feature.properties.startNode), 
                    endNode: parseInt(feature.properties.endNode)
                }
            else {
                links[feature.properties.openStreetMapWayId].endNode = parseInt(feature.properties.endNode);
            }
        }
        return links;
    }

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
        const paddingValue = 0.005;
        Top = Top + paddingValue;
        Bottom = Bottom - paddingValue;
        Left = Left - paddingValue;
        Right = Right + paddingValue;
        const corner1 = L.latLng(Top, Left);
        const corner2 = L.latLng(Bottom, Right);
        return L.latLngBounds(corner1, corner2);
    
    }

})();
