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
const logger = require("./logger");

class networkModelLinkService {

    /** A service to collect, process and serve network model link data
     * @constructor
     */
    constructor(){
        this.networkLinkList = [];
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

    /** Get a standard set of query parameters for getting the network model info
     * @method getNetworkModelQueryParams
     * @param {string} networkModelVersion 
     * @returns {Array<queryParameter>}
     */
    getNetworkModelQueryParams(networkModelVersion = ""){
        const queryParameters = [
            {
                select: "PartitionKey, RowKey, attrs, location, predefinedLocationName",
                field: "PartitionKey",
                comparator: "eq",
                value: networkModelVersion
            },
            {
                select: "",
                field: "modelElement",
                comparator: "eq",
                value: "NTIS_Network_Links"
            }
        ];
        return queryParameters;
    }

    /** Process the network model link results into a simple flat array saved in the instance memory
     * @method processLinkResults
     * @param {Array} linkSearchResults - An array with the results of a network model link search
     */
    processLinkResults(linkResults){
        const results = [];
        linkResults.forEach((link) => {
            const result = this.processNetworKModelLink(link);
            results.push(result);
        });
        logger.info(`Processed ${results.length} network links`);
        return this.networkLinkList = results;
    }

    /** Flatten an individual network link
     * @method processNetworKModelLink
     * @param {object} networkLink 
     * @returns {object}
     */
    processNetworKModelLink(link){
        const itemToReturn = {};
        itemToReturn.id = link.RowKey;
        itemToReturn.version = link.PartitionKey;
        const tempLocation = JSON.parse(link.location);
        itemToReturn.carriageway = tempLocation.supplementaryPositionalDescription.carriageway;
        itemToReturn.length = tempLocation.supplementaryPositionalDescription.lengthAffected;
        itemToReturn.direction = tempLocation.linearWithinLinearElement.directionBoundOnLinearSection;
        itemToReturn.roadNumber = tempLocation.linearWithinLinearElement.linearElement.roadNumber;
        itemToReturn.nature = tempLocation.linearWithinLinearElement.linearElement.linearElementNature;
        itemToReturn.startNode = tempLocation.linearWithinLinearElement.fromPoint.fromReferent.referentIdentifier;
        itemToReturn.endNode = tempLocation.linearWithinLinearElement.toPoint.fromReferent.referentIdentifier;
        tempLocation.linearExtension.areaDescriptor.forEach(function(area){
            itemToReturn[area.tpegAreaDescriptorType] = area.descriptor.text;
        });
        itemToReturn.startJuntion = tempLocation.linearExtension.linearLocation.from.ilc.descriptor;
        itemToReturn.endJunction = tempLocation.linearExtension.linearLocation.to.ilc.descriptor;
        const tempDescription = JSON.parse(link.predefinedLocationName);
        itemToReturn.description = tempDescription.text;
        return itemToReturn;
    }

    /* istanbul ignore next */
    /** Download the unprocessed network link details from table storage
     * @method getNetworkLinksFromTableStorage
     * @param {string} networkModelVersion - The version of the network model to request
     */
    async getNetworkLinksFromTableStorage(networkModelVersion = this.currentNetworkModelVersion){
        const queryParameters = this.getNetworkModelQueryParams(networkModelVersion);
        const query = queryBuilder.buildAndQuery(queryParameters);
        const tableService = this.getNetworkModelTableService();
        const result = await QueryRunner.RunQueryToCompletion(query, tableService, this.modelTablename);
        logger.info(`Downloaded ${result.length} network links for model version ${networkModelVersion}`);
        this.processLinkResults(result);
    }

    /** Get a list of all network model links
     * @method getNetworkLinkList
     * @returns {Array} - an array of network model link items
     */
    getNetworkLinkList(){
        return this.networkLinkList;
    }

}

module.exports = networkModelLinkService;
