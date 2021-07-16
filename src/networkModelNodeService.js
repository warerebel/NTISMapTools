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

const azurestorage = require("azure-storage");
const queryBuilder = require("./queryBuilder");
const QueryRunner = require("./queryRunner");

class networkModelNodeService {

    /** A service to collect, process and serve network model link data
     * @constructor
     */
    constructor(){
        this.networkNodeList = [];
        this.currentNetworkModelVersion = process.env.CURRENT_NETWORK_MODEL_VERSION;
        this.storageKey = process.env.NETWORK_MODEL_STORAGE_KEY;
        this.modelTablename = process.env.NETWORK_MODEL_TABLE_NAME;
    }

    /* istanbul ignore next */
    /** Get the azure table service for the network model storage table
     * @method getNetworkModelTableService
     * @param {string} storageKey - The storage key for the azure table service
     * @returns {object} - An azure tableservice
     */
    getNetworkModelTableService(storageKey = this.storageKey){
        return this.networkModeltableService = azurestorage.createTableService(storageKey);
    }

    /** Get a standard set of query parameters for getting the network model nodes
     * @method getNetworkModelQueryParams
     * @param {string} networkModelVersion 
     * @returns {Array<queryParameter>}
     */
    getNetworkModelQueryParams(networkModelVersion = ""){
        const queryParameters = [
            {
                select: "PartitionKey, RowKey, location",
                field: "PartitionKey",
                comparator: "eq",
                value: networkModelVersion
            },
            {
                select: "",
                field: "modelElement",
                comparator: "eq",
                value: "NTIS_Network_Nodes"
            }
        ];
        return queryParameters;
    }

    /** Process the network model node results into a simple flat array saved in the instance memory
     * @method processLinkResults
     * @param {Array} nodeSearchResults - An array with the results of a network model node search
     */
    processNodeResults(nodeSearchResults){
        const results = [];
        nodeSearchResults.forEach((link) => {
            const result = this.processNetworkModelNode(link);
            results.push(result);
        });
        return this.networkNodeList = results;
    }

    /** Flatten an individual network link
     * @method processNetworKModelLink
     * @param {object} networkLink 
     * @returns {object}
     */
    processNetworkModelNode(node){
        const itemToReturn = {};
        itemToReturn.id = node.RowKey;
        itemToReturn.version = node.PartitionKey;
        const tempLocation = JSON.parse(node.location);
        itemToReturn.latitude = parseFloat(tempLocation.pointByCoordinates.latitude);
        itemToReturn.longitude = parseFloat(tempLocation.pointByCoordinates.longitude);
        return itemToReturn;
    }

    /* istanbul ignore next */
    /** Download the unprocessed network link details from table storage
     * @method getNetworkNodesFromTableStorage
     * @param {string} networkModelVersion - The version of the network model to request
     */
    async getNetworkNodesFromTableStorage(networkModelVersion = this.currentNetworkModelVersion){
        const queryParameters = this.getNetworkModelQueryParams(networkModelVersion);
        const query = queryBuilder.buildAndQuery(queryParameters);
        const tableService = this.getNetworkModelTableService();
        const result = await QueryRunner.RunQueryToCompletion(query, tableService, this.modelTablename);
        this.processNodeResults(result);
    }

    /** Get a list of all network model nodes
     * @method getNetworkLinkList
     * @returns {Array} - an array of network model link items
     */
    getNetworkNodeList(){
        return this.networkNodeList;
    }

}

module.exports = networkModelNodeService;
