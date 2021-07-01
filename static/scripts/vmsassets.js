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

/* global L ntismapdiv fetch */

(function(){
    
    let currentMarkers = [];

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

    async function updateMarkers(){
        let tempmarkers = currentMarkers;
        currentMarkers = [];
        const VMSList = await updateAssets();
        VMSList.forEach(function(vms){
            let marker = L.marker([vms.latitude, vms.longitude], {title: vms.vmsUnitIdentifier}).addTo(ntismapdiv);
            currentMarkers.push(marker);
        });
        tempmarkers.forEach(function(marker){
            marker.remove();
        });
    }

    ntismapdiv.on("zoomend", updateMarkers);
    ntismapdiv.on("moveend", updateMarkers);
    ntismapdiv.on("load", updateMarkers);

})();


