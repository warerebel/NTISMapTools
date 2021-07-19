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

/* global L window document */

const ntismapdiv = L.map("NTISMap", {
    zoomControl: false
});

const zoomControl = L.control.zoom();
zoomControl.setPosition("bottomleft");
zoomControl.addTo(ntismapdiv);

(function(){

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
    }).addTo(ntismapdiv);

    window.addEventListener("resize", resizeMap);

    function resizeMap(){
        document.getElementById("NTISMap").style.height = (window.innerHeight - 100).toString().concat("px");
        ntismapdiv.invalidateSize();
    }

    resizeMap();

})();
