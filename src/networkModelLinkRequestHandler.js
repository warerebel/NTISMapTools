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

const vmsModelService = require("./routes/vmsRoute").vmsModelService;

class networkModelLinkRequestHandler {

    /** Construct new networkModelLinkRequesthandler
     * @constructor networkModelLinkRequesthandler
     * @param {object} networkLinkModelService - The model service holding the model data
     */
    constructor(networkLinkModelService){
        this.networkLinkModelService = networkLinkModelService;
    }

    /** Get a list of all network links
     * @method getAllNetworkLinks
     * @returns {Array}
     */
    getAllNetworkLinks(){
        return this.networkLinkModelService.getNetworkLinkList();
    }

    /** Find up to 10 targets to return as potential matches
     * @method findMatch
     * @returns {Array}
     */
    findMatch(target){
        const links = this.networkLinkModelService.getNetworkLinkList();
        const vms = vmsModelService.getVMSSiteList();
        const results = [];
        for(let i = 0; i < links.length; i++){
            if(links[i].description.toLowerCase().includes(target))
                results.push({type: "description", result: links[i].description, node: links[i].startNode});
            if(results.length >= 10)
                return results;
        }
        for(let i = 0; i < vms.length; i++){
            if(vms[i].vmsUnitIdentifier.toLowerCase().includes(target))
                results.push({type: "vms", result: vms[i].vmsUnitIdentifier, latitude: vms[i].latitude, longitude: vms[i].longitude});
            if(results.length >= 10)
                return results;
        }
        return results;
    }

}

module.exports = networkModelLinkRequestHandler;
