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

/* global L ntismapdiv fetch iconLinks */

(function(){
    let currentMarkers = [];
    ntismapdiv.on("zoomend", updateMarkers);
    ntismapdiv.on("moveend", updateMarkers);
    //ntismapdiv.on("load", updateMarkers);
    ntismapdiv.on("load", updateMarkers).setView([52.453643, -2.010528], 13);

    let currentLayers = {};
    const TT = L.layerGroup().addTo(ntismapdiv);
    const TS = L.layerGroup().addTo(ntismapdiv);
    const THT = L.layerGroup().addTo(ntismapdiv);
    const TE = L.layerGroup().addTo(ntismapdiv);
    const TN = L.layerGroup().addTo(ntismapdiv);
    const FT = L.layerGroup().addTo(ntismapdiv);
    const FTH = L.layerGroup().addTo(ntismapdiv);
    const FF = L.layerGroup().addTo(ntismapdiv);
    let currentLayerControl = L.control.layers(null).addTo(ntismapdiv);
    currentLayers = {
        "2x12": TT,
        "2x16": TS,
        "3x12": THT,
        "3x18": TE,
        "3x9": TN,
        "4x12": FT,
        "4x13": FTH,
        "4x15": FF
    };

    /** Gets a bounding box for the current map view
     * @function getBoundBox 
     * @returns {object} - a bound box object
     */
    function getBoundBox(){
        const bounds = ntismapdiv.getBounds();
        return {
            topLeft: {
                latitude: bounds.getNorth(),
                longitude: bounds.getWest()
            },
            bottomRight: {
                latitude: bounds.getSouth(),
                longitude: bounds.getEast()
            }
        };
    }

    /** Request a new list of assets from the server
     * @async
     * @function updateAssets
     * @returns {object} - The new assets
     */
    async function updateAssets(){
        const boundBox = getBoundBox();
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boundBox)
        };
        const VMSList = await fetch("/vms/boundingBox", requestOptions);
        const VMSObjects = await VMSList.json();
        return VMSObjects;
    }

    /** - Clears all the markers in the current layer groups and adds new markers
     * @async
     * @function updateMarkers
     */
    async function updateMarkers(){
        const VMSList = await updateAssets();
        const newMarkers = [];
        VMSList.forEach(function(vms){
            const result = currentMarkers.some(element => element.options.title === vms.vmsUnitIdentifier);
            if(!result){
                let direction = isNaN(parseInt(vms.vmsUnitIdentifier.substr(vms.vmsUnitIdentifier.length -1, 1))) ? vms.vmsUnitIdentifier.substr(vms.vmsUnitIdentifier.length -1, 1) : vms.vmsUnitIdentifier.substr(vms.vmsUnitIdentifier.length -2, 1);
                let icon = iconLinks[vms.textDisplay.concat(direction)];
                let marker = L.marker([vms.latitude, vms.longitude], {title: vms.vmsUnitIdentifier, icon: icon, riseOnHover: true});
                marker.bindPopup(`<div class="card"><div class="card-body"><h5 class="card-title">VMS Information</h5><table><tr><td class="popupAttribute">Identifier: </td><td class="popupAttributeValue">${vms.vmsUnitIdentifier}</td></tr></div>
            <tr><td class="popupAttribute">Size: </td><td class="popupAttributeValue">${vms.textDisplay}</td></table></div></div>`, {offset: [0,-42]});
                newMarkers.push(marker);
                currentLayers[vms.textDisplay].addLayer(marker);
            }
        });
        for(let property in currentLayers){
            if(Object.prototype.hasOwnProperty.call(currentLayers, property)){
                const markers = currentLayers[property].getLayers();
                for(let index in markers){
                    const result = VMSList.some(element => element.vmsUnitIdentifier === markers[index].options.title);
                    if(!result)
                        currentLayers[property].removeLayer(markers[index]);
                }    
            }
        }
        currentMarkers = newMarkers;
    }

    /** Initialise the checkbox control for selecting layers
     * @function initLayerControl
     */
    function initLayerControl(){
        currentLayerControl.addOverlay(TT, "2x12");
        currentLayerControl.addOverlay(TS, "2x16");
        currentLayerControl.addOverlay(THT, "3x12");
        currentLayerControl.addOverlay(TE, "3x18");
        currentLayerControl.addOverlay(TN, "3x9");
        currentLayerControl.addOverlay(FT, "4x12");
        currentLayerControl.addOverlay(FTH, "4x13");
        currentLayerControl.addOverlay(FF, "4x15");
    }

    initLayerControl();

})();


