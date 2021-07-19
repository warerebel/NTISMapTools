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

/* global L ntismapdiv document fetch */

(function(){

    /**
     * Our search box which extends a leaflet map control
     * @class mapSearchBox
     */
    class mapSearchBox extends L.Control {

        constructor(){
            super();
        }

        onAdd(){
            return document.getElementById("mapSearchBar");
        }
    }

    const myMapSearch = new mapSearchBox();
    myMapSearch.setPosition("topleft");
    myMapSearch.addTo(ntismapdiv);

    const searchbar = document.getElementById("mapSearchBar");
    searchbar.addEventListener("input", searchBarValueUpdated);

    async function searchBarValueUpdated(){
        const searchOptions = document.getElementById("mapSearchOptions");
        let matchArray = [];
        if(searchbar.value.length >= 3)
            matchArray = await updateMatches(searchbar.value);
        if(matchArray.length > 1 && matchArray[0].result !== matchArray[matchArray.length -1].result){
            const newOptions = [];
            matchArray.forEach(element => {
                let tag = document.createElement("option");
                tag.value = element.result;
                newOptions.push(tag);
            });
            searchOptions.replaceChildren(...newOptions);
        } else if (matchArray.length === 1 || matchArray[0].result === matchArray[matchArray.length -1].result){
            const node = await getNode(matchArray[0].node);
            ntismapdiv.panTo([node.latitude, node.longitude]);
            let tag = document.createElement("option");
            tag.value = "Type to search...";
            searchOptions.replaceChildren(tag);
            searchbar.value = "";
        } else {
            let tag = document.createElement("option");
            tag.value = "Type to search...";
            searchOptions.replaceChildren(tag);
        }
        
        
    }

    async function updateMatches(data){
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({string: data})
        };
        const matches = await fetch("/links/match", requestOptions);
        const matchArray = await matches.json();
        console.log(matchArray);
        return matchArray;
    }

    async function getNode(nodeid){
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: nodeid})
        };
        const matches = await fetch("/nodes/byid", requestOptions);
        const node = await matches.json();
        console.log(node);
        return node;
    }

})();
