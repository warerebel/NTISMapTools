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

class vmsRequestHandler {

    /** Construct new vmsRequesthandler
     * @constructor vmsRequestHandler
     * @param {object} vmsModelService - The model service holding the model data
     */
    constructor(vmsModelService){
        this.vmsModelService = vmsModelService;
    }

    /** Get a list of all vms sites
     * @method getAllVMS
     * @returns {Array}
     */
    getAllVMS(){
        return this.vmsModelService.getVMSSiteList();
    }

    /** Get a list of VMS in a bounding box
     * @method getVMSInBoundingBox
     */
    getVMSInBoundingBox(topLeft, bottomRight){
        const siteList = this.vmsModelService.getVMSSiteList();
        const results = [];
        siteList.forEach(function(site){
            if(site.latitude >= bottomRight.latitude && site.latitude <= topLeft.latitude && site.longitude <= bottomRight.longitude && site.longitude >= topLeft.longitude)
                results.push(site);
        });
        return results;
    }

}

module.exports = vmsRequestHandler;
