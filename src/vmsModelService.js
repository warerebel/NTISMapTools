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

class vmsModelService {

    /** A service to collect, process and serve VMS asset model data
     * @constructor
     */
    constructor(){
        this.vmsModelList = [];
        this.currentNetworkModelVersion = process.env.CURRENT_NETWORK_MODEL_VERSION;
        this.storageKey = process.env.NETWORK_MODEL_STORAGE_KEY;
        this.modelTablename = process.env.NETWORK_MODEL_TABLE_NAME;
    }

    /* istanbul ignore next */
    /** Get the azure table service for the vms model storage table
     * @method getVMSModelTableService
     * @param {string} storageKey - The storage key for the azure table service
     * @returns {object} - An azure tableservice
     */
    getVMSModelTableService(storageKey = this.storageKey){
        return this.vmsModeltableService = azurestorage.createTableService(storageKey);
    }

    /** Get a standard set of query parameters for getting the VMS model info
     * @method getVMSModelQueryParams
     * @param {string} networkModelVersion 
     * @returns {Array<queryParameter>}
     */
    getVMSModelQueryParams(networkModelVersion = ""){
        const queryParameters = [
            {
                select: "RowKey, PartitionKey, vmsUnitIdentifier, vmsUnitElectronicAddress, vmsRecord",
                field: "PartitionKey",
                comparator: "eq",
                value: networkModelVersion
            },
            {
                select: "",
                field: "name",
                comparator: "eq",
                value: "vmsUnitRecord"
            }
        ];
        return queryParameters;
    }

    /** Process the VMS results into a simple flat array saved in the instance memory
     * @method processVMSResults
     * @param {Array} vmsSearchResults - An array with the results of a VMS model search
     */
    processVMSResults(vmsResults){
        const results = [];
        vmsResults.forEach((site) => {
            const result = this.processVMSSite(site);
            if(typeof result.id !== "undefined")
                results.push(result);
        });
        logger.info(`Processed ${results.length} vms sites`);
        return this.vmsModelList = results;
    }

    /** Flatten an individual VMS site
     * @method processVMSSite
     * @param {object} vmsSite 
     * @returns {object}
     */
    processVMSSite(vmsSite){
        const itemToReturn = {};
        itemToReturn.id = vmsSite.RowKey;
        itemToReturn.version = vmsSite.PartitionKey;
        itemToReturn.vmsUnitIdentifier = vmsSite.vmsUnitIdentifier;
        itemToReturn.vmsUnitElectronicAddress = vmsSite.vmsUnitElectronicAddress;
        const tempItem = JSON.parse(vmsSite.vmsRecord);
        if(tempItem.vmsRecord.vmsType === "matrixSign")
            return {};
        itemToReturn.textDisplay = tempItem.vmsRecord.vmsTextDisplayCharacteristics.maxNumberOfRows + "x" + tempItem.vmsRecord.vmsTextDisplayCharacteristics.maxNumberOfCharacters;
        itemToReturn.latitude = parseFloat(tempItem.vmsRecord.vmsLocation.locationForDisplay.latitude);
        itemToReturn.longitude = parseFloat(tempItem.vmsRecord.vmsLocation.locationForDisplay.longitude);
        itemToReturn.networkLink = tempItem.vmsRecord.vmsLocation.pointAlongLinearElement.linearElement.linearElementIdentifier;
        return itemToReturn;
    }


    /* istanbul ignore next */
    /** Download the unprocessed VMS asset details from table storage
     * @method getVMSFromTableStorage
     * @param {string} networkModelVersion - The version of the network model to request
     */
    async getVMSFromTableStorage(networkModelVersion = this.currentNetworkModelVersion){
        const queryParameters = this.getVMSModelQueryParams(networkModelVersion);
        const query = queryBuilder.buildAndQuery(queryParameters);
        const tableService = this.getVMSModelTableService();
        const result = await QueryRunner.RunQueryToCompletion(query, tableService, this.modelTablename);
        logger.info(`Downloaded ${result.length} vms sites for model version ${networkModelVersion}`);
        this.processVMSResults(result);
    }

    /** Get a list of all vms model items
     * @method getVMSSiteList
     * @returns {Array} - an array of vms model items
     */
    getVMSSiteList(){
        return this.vmsModelList;
    }
}

module.exports = vmsModelService;
