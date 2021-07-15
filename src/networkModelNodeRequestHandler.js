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

class networkModelNodeRequestHandler {

    /** Construct new networkModelNodeRequesthandler
     * @constructor networkModelNodeRequesthandler
     * @param {object} networkNodeModelService - The model service holding the model data
     */
    constructor(networkNodeModelService){
        this.networkNodeModelService = networkNodeModelService;
    }

    /** Get a list of all network nodes
     * @method getAllNetworkNodes
     * @returns {Array}
     */
    getAllNetworkNodes(){
        return this.networkNodeModelService.getNetworkNodeList();
    }

    /** return a specific node
     * @method getNode
     * @returns {Object}
     */
    getNode(target){
        const nodes = this.networkNodeModelService.getNetworkNodeList();
        for(let i = 0; i < nodes.length; i++) {
            if(nodes[i].id === target)
                return nodes[i];
        }
        return {};
    }

}

module.exports = networkModelNodeRequestHandler;
