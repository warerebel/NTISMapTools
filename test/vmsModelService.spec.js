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

const vmsModelService = require("../src/vmsModelService");
const assert = require("assert");

describe("vmsModelService", function(){

    before(function(){
        this.returnedVMSSample = {
            "odata.etag": "W/\"datetime'2021-06-18T18%3A57%3A11.2771295Z'\"",
            PartitionKey: "14.12",
            RowKey: "0D3EDF9EB3107BB9E0533CC711AC4D20",
            vmsRecord: "{\"vmsRecord\":{\"vmsDescription\":{\"text\":\"2x12 VMS\",\"attrs\":{\"lang\":\"en\"}},\"vmsType\":\"monochromeGraphic\",\"vmsTypeCode\":\"101\",\"vmsTextDisplayCharacteristics\":{\"maxNumberOfCharacters\":\"12\",\"maxNumberOfRows\":\"2\"},\"vmsLocation\":{\"locationForDisplay\":{\"latitude\":\"53.8018333237198\",\"longitude\":\"-2.69248493889856\"},\"pointAlongLinearElement\":{\"linearElement\":{\"linearElementReferenceModel\":\"NTIS_Network_Links\",\"linearElementReferenceModelVersion\":\"14.12\",\"linearElementIdentifier\":\"117016001\",\"attrs\":{\"xsi:type\":\"LinearElementByCode\"}},\"distanceAlongLinearElement\":{\"distanceAlong\":\"2598\",\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementStart\"}}},\"attrs\":{\"xsi:type\":\"Point\"}}},\"attrs\":{\"vmsIndex\":\"0\"}}",
            vmsUnitElectronicAddress: "024/4/012/117",
            vmsUnitIdentifier: "M6/7556A"
        };
        this.targetVMSSample = {
            id: "0D3EDF9EB3107BB9E0533CC711AC4D20",
            version: "14.12",
            vmsUnitIdentifier: "M6/7556A",
            vmsUnitElectronicAddress: "024/4/012/117",
            textDisplay: "2x12",
            latitude: 53.8018333237198,
            longitude: -2.69248493889856
        };
        this.matrixSignSample = {
            "odata.etag": "W/\"datetime'2021-06-18T18%3A56%3A04.6977033Z'\"",
            PartitionKey: "14.12",
            RowKey: "D25095020E357952E0433CC411ACA994",
            vmsRecord: "{\"vmsRecord\":{\"vmsDescription\":{\"text\":\"Lane\",\"attrs\":{\"lang\":\"en\"}},\"vmsType\":\"matrixSign\",\"vmsTypeCode\":\"421\",\"vmsLocation\":{\"locationForDisplay\":{\"latitude\":\"52.5457960473457\",\"longitude\":\"-1.96290913012818\"},\"pointAlongLinearElement\":{\"linearElement\":{\"linearElementReferenceModel\":\"NTIS_Network_Links\",\"linearElementReferenceModelVersion\":\"14.12\",\"linearElementIdentifier\":\"112004402\",\"attrs\":{\"xsi:type\":\"LinearElementByCode\"}},\"distanceAlongLinearElement\":{\"distanceAlong\":\"1412\",\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementStart\"}}},\"attrs\":{\"xsi:type\":\"Point\"}}},\"attrs\":{\"vmsIndex\":\"0\"}}",
            vmsUnitElectronicAddress: "050/2/214/102",
            vmsUnitIdentifier: "M5/7010K2"
        };
    });

    beforeEach(function(){
        this.myVMSModelService = new vmsModelService();
    });
    
    describe("processVMSSite", function(){

        it("flattens a valid VMS site table storage object", function(){
            const result = this.myVMSModelService.processVMSSite(this.returnedVMSSample);
            assert.deepStrictEqual(result, this.targetVMSSample);
        });

        it("returns an empty object for a matrix sign", function(){
            const result = this.myVMSModelService.processVMSSite(this.matrixSignSample);
            assert.deepStrictEqual(result, {});
        });

    });

    describe("processVMSResults", function(){

        it("processes a mixed array of vms items", function(){
            let inputArray = {};
            inputArray = [this.returnedVMSSample, this.returnedVMSSample, this.matrixSignSample, this.returnedVMSSample];
            const targetArray = [this.targetVMSSample, this.targetVMSSample, this.targetVMSSample];
            const result = this.myVMSModelService.processVMSResults(inputArray);
            assert.deepStrictEqual(result, targetArray);
        });

    });

    describe("getVMSModelQueryParams", function(){

        it("generates appropriate query parameters", function(){
            const target = [
                {
                    select: "RowKey, PartitionKey, vmsUnitIdentifier, vmsUnitElectronicAddress, vmsRecord",
                    field: "PartitionKey",
                    comparator: "eq",
                    value: "11.11"
                },
                {
                    select: "",
                    field: "name",
                    comparator: "eq",
                    value: "vmsUnitRecord"
                }
            ];
            const parameters = this.myVMSModelService.getVMSModelQueryParams("11.11");
            assert.deepStrictEqual(parameters, target);
        });
        
    });

    describe("getVMSSiteList", function(){

        it("returns a complete vms site list", function(){
            let inputArray = {};
            inputArray = [this.returnedVMSSample, this.returnedVMSSample, this.returnedVMSSample];
            const targetArray = [this.targetVMSSample, this.targetVMSSample, this.targetVMSSample];
            this.myVMSModelService.processVMSResults(inputArray);
            const result = this.myVMSModelService.getVMSSiteList();
            assert.deepStrictEqual(result, targetArray);
        });

    });
});
