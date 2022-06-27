"use strict";

/* global L window document */

const openlrmapdiv = L.map("openlrmap", {zoomControl: false});

const zoomControl = L.control.zoom();
zoomControl.setPosition("bottomleft");
zoomControl.addTo(openlrmapdiv);

(function(){

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
    }).addTo(openlrmapdiv);

    window.addEventListener("resize", resizeMap);

    function resizeMap(){
        document.getElementById("openlrmap").style.height = (window.innerHeight - 100).toString().concat("px");
        openlrmapdiv.invalidateSize();
    }

    openlrmapdiv.setView([52.453643, -2.010528], 13);

    resizeMap();

})();