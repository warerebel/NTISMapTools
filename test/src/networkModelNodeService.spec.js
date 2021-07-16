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

const networkModelNodeService = require("../../src/networkModelNodeService");
const assert = require("assert");

describe("networkModelNodeService", function(){

    before(function(){
        this.returnedNodeSamples = [
            {
                "odata.etag": "W/\"datetime'2021-06-18T18%3A54%3A49.1049839Z'\"",
                PartitionKey: "14.12",
                RowKey: "1010001",
                location: "{\"attrs\":{\"xsi:type\":\"Point\"},\"pointByCoordinates\":{\"latitude\":\"50.8608386454716\",\"longitude\":\"-3.38315366272426\"}}"
            },
            {
                "odata.etag": "W/\"datetime'2021-06-18T18%3A54%3A49.1049839Z'\"",
                PartitionKey: "14.12",
                RowKey: "1010002",
                location: "{\"attrs\":{\"xsi:type\":\"Point\"},\"pointByCoordinates\":{\"latitude\":\"50.8608234863489\",\"longitude\":\"-3.38443205258552\"}}"
            }
        ];
        this.targetNodeSamples = [
            {
                id: "1010001",
                version: "14.12",
                latitude: 50.8608386454716,
                longitude: -3.38315366272426
            },
            {
                id: "1010002",
                version: "14.12",
                latitude: 50.8608234863489,
                longitude: -3.38443205258552
            }
        ];
    });

    beforeEach(function(){
        this.myNodeModelService = new networkModelNodeService();
    });

    describe("processNetworKModelNode", function(){

        it("flattens a valid node table storage object", function(){
            const result = this.myNodeModelService.processNetworkModelNode(this.returnedNodeSamples[1]);
            assert.deepStrictEqual(result, this.targetNodeSamples[1]);
        });

    });

    describe("processNodeResults", function(){

        it("processes a mixed array of node items", function(){
            const result = this.myNodeModelService.processNodeResults(this.returnedNodeSamples);
            assert.deepStrictEqual(result, this.targetNodeSamples);
        });

    });

    describe("getNetworkModelQueryParams", function(){

        it("generates appropriate query parameters", function(){
            const target = [
                {
                    select: "PartitionKey, RowKey, location",
                    field: "PartitionKey",
                    comparator: "eq",
                    value: "11.11"
                },
                {
                    select: "",
                    field: "modelElement",
                    comparator: "eq",
                    value: "NTIS_Network_Nodes"
                }
            ];
            const parameters = this.myNodeModelService.getNetworkModelQueryParams("11.11");
            assert.deepStrictEqual(parameters, target);
        });
        
    });

    describe("getNetworkNodeList", function(){

        it("returns a complete node site list", function(){
            let inputArray = [this.returnedNodeSamples[0], this.returnedNodeSamples[1], this.returnedNodeSamples[0]];
            const targetArray = [this.targetNodeSamples[0], this.targetNodeSamples[1], this.targetNodeSamples[0]];
            this.myNodeModelService.processNodeResults(inputArray);
            const result = this.myNodeModelService.getNetworkNodeList();
            assert.deepStrictEqual(result, targetArray);
        });

    });

});
