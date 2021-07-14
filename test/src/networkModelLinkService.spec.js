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

const networkModelLinkService = require("../../src/networkModelLinkService");
const assert = require("assert");

describe("networkModelLinkService", function(){

    before(function(){
        this.returnedLinkSamples = [
            {
                "odata.etag": "W/\"datetime'2021-06-18T18%3A54%3A49.1049839Z'\"",
                PartitionKey: "14.12",
                RowKey: "101000101",
                attrs: "{\"version\":\"14.12\",\"id\":\"101000101\"}",
                location: "{\"supplementaryPositionalDescription\":{\"carriageway\":\"exitSlipRoad\",\"lane\":\"allLanesCompleteCarriageway\",\"lengthAffected\":\"389.2783\"},\"linearWithinLinearElement\":{\"directionBoundOnLinearSection\":\"southBound\",\"linearElement\":{\"roadNumber\":\"M5\",\"linearElementNature\":\"road\",\"attrs\":{\"xsi:type\":\"LinearElement\"}},\"fromPoint\":{\"distanceAlong\":\"0\",\"fromReferent\":{\"referentIdentifier\":\"1010020\",\"referentType\":\"roadNode\"},\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementReferent\"}},\"toPoint\":{\"distanceAlong\":\"0\",\"fromReferent\":{\"referentIdentifier\":\"1010001\",\"referentType\":\"roadNode\"},\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementReferent\"}},\"linearWithinLinearElementExtension\":{\"exitPointStaticCapacity\":\"1887\",\"midPointStaticCapacity\":\"4194\"}},\"linearExtension\":{\"areaDescriptor\":[{\"descriptor\":{\"text\":\"Devon County\",\"attrs\":{\"lang\":\"en\"}},\"tpegAreaDescriptorType\":\"countyName\"},{\"descriptor\":{\"text\":\"Area 2\",\"attrs\":{\"lang\":\"en\"}},\"tpegAreaDescriptorType\":\"areaName\"},{\"descriptor\":{\"text\":\"South West RCC\",\"attrs\":{\"lang\":\"en\"}},\"tpegAreaDescriptorType\":\"regionName\"}],\"linearLocation\":{\"tpegDirection\":\"southBound\",\"tpegLinearLocationType\":\"segment\",\"to\":{\"pointCoordinates\":{\"latitude\":\"50.860839\",\"longitude\":\"-3.383154\"},\"ilc\":\"tpegIlcName2\",\"attrs\":{\"xsi:type\":\"TpegJunction\"}},\"from\":{\"pointCoordinates\":{\"latitude\":\"50.864338\",\"longitude\":\"-3.383101\"},\"name\":{\"descriptor\":{\"text\":\"27\",\"attrs\":{\"lang\":\"en\"}},\"tpegJunctionPointDescriptorType\":\"junctionName\"},\"ilc\":{\"descriptor\":\"A361\",\"tpegIlcPointDescriptorType\":\"tpegIlcName2\"},\"attrs\":{\"xsi:type\":\"TpegJunction\"}}}},\"attrs\":{\"xsi:type\":\"Linear\"}}",
                predefinedLocationName: "{\"text\":\"M5 J28 southbound exit\",\"attrs\":{\"lang\":\"en\"}}",
            },
            {
                "odata.etag": "W/\"datetime'2021-06-18T18%3A54%3A49.1049839Z'\"",
                PartitionKey: "14.12",
                RowKey: "101000701",
                attrs: "{\"version\":\"14.12\",\"id\":\"101000701\"}",
                location: "{\"supplementaryPositionalDescription\":{\"carriageway\":\"mainCarriageway\",\"lane\":\"allLanesCompleteCarriageway\",\"lengthAffected\":\"1250.6351\"},\"linearWithinLinearElement\":{\"directionBoundOnLinearSection\":\"eastBound\",\"linearElement\":{\"roadNumber\":\"A38\",\"linearElementNature\":\"road\",\"attrs\":{\"xsi:type\":\"LinearElement\"}},\"fromPoint\":{\"distanceAlong\":\"0\",\"fromReferent\":{\"referentIdentifier\":\"5000640\",\"referentType\":\"roadNode\"},\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementReferent\"}},\"toPoint\":{\"distanceAlong\":\"0\",\"fromReferent\":{\"referentIdentifier\":\"1010007\",\"referentType\":\"roadNode\"},\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementReferent\"}},\"linearWithinLinearElementExtension\":\"5985\"},\"linearExtension\":{\"areaDescriptor\":[{\"descriptor\":{\"text\":\"Devon County\",\"attrs\":{\"lang\":\"en\"}},\"tpegAreaDescriptorType\":\"countyName\"},{\"descriptor\":{\"text\":\"Area 1\",\"attrs\":{\"lang\":\"en\"}},\"tpegAreaDescriptorType\":\"areaName\"},{\"descriptor\":{\"text\":\"South West RCC\",\"attrs\":{\"lang\":\"en\"}},\"tpegAreaDescriptorType\":\"regionName\"}],\"linearLocation\":{\"tpegDirection\":\"eastBound\",\"tpegLinearLocationType\":\"segment\",\"to\":{\"pointCoordinates\":{\"latitude\":\"50.67879\",\"longitude\":\"-3.520158\"},\"ilc\":{\"descriptor\":\"M5\",\"tpegIlcPointDescriptorType\":\"tpegIlcName2\"},\"attrs\":{\"xsi:type\":\"TpegJunction\"}},\"from\":{\"pointCoordinates\":{\"latitude\":\"50.6726\",\"longitude\":\"-3.53392\"},\"ilc\":{\"descriptor\":\"A379\",\"tpegIlcPointDescriptorType\":\"tpegIlcName2\"},\"attrs\":{\"xsi:type\":\"TpegJunction\"}}}},\"attrs\":{\"xsi:type\":\"Linear\"}}",
                predefinedLocationName: "{\"text\":\"A38 eastbound between A379 and M5/A30\",\"attrs\":{\"lang\":\"en\"}}",
            }
        ];
        this.targetLinkSamples = [
            {
                id: "101000101",
                version: "14.12",
                carriageway: "exitSlipRoad",
                length: "389.2783",
                direction: "southBound",
                roadNumber: "M5",
                nature: "road",
                startNode: "1010020",
                endNode: "1010001",
                countyName: "Devon County",
                areaName: "Area 2",
                regionName: "South West RCC",
                startJuntion: "A361",
                endJunction: undefined,
                description: "M5 J28 southbound exit",
            },
            {
                id: "101000701",
                version: "14.12",
                carriageway: "mainCarriageway",
                length: "1250.6351",
                direction: "eastBound",
                roadNumber: "A38",
                nature: "road",
                startNode: "5000640",
                endNode: "1010007",
                countyName: "Devon County",
                areaName: "Area 1",
                regionName: "South West RCC",
                startJuntion: "A379",
                endJunction: "M5",
                description: "A38 eastbound between A379 and M5/A30",
            }
        ];
    });

    beforeEach(function(){
        this.myLinkModelService = new networkModelLinkService();
    });

    describe("processNetworKModelLink", function(){

        it("flattens a valid link table storage object", function(){
            const result = this.myLinkModelService.processNetworKModelLink(this.returnedLinkSamples[1]);
            assert.deepStrictEqual(result, this.targetLinkSamples[1]);
        });

    });

    describe("processLinkResults", function(){

        it("processes a mixed array of link items", function(){
            const result = this.myLinkModelService.processLinkResults(this.returnedLinkSamples);
            assert.deepStrictEqual(result, this.targetLinkSamples);
        });

    });

    describe("getNetworkModelQueryParams", function(){

        it("generates appropriate query parameters", function(){
            const target = [
                {
                    select: "PartitionKey, RowKey, attrs, location, predefinedLocationName",
                    field: "PartitionKey",
                    comparator: "eq",
                    value: "11.11"
                },
                {
                    select: "",
                    field: "modelElement",
                    comparator: "eq",
                    value: "NTIS_Network_Links"
                }
            ];
            const parameters = this.myLinkModelService.getNetworkModelQueryParams("11.11");
            assert.deepStrictEqual(parameters, target);
        });
        
    });

    describe("getNetworkLinkList", function(){

        it("returns a complete link site list", function(){
            let inputArray = [this.returnedLinkSamples[0], this.returnedLinkSamples[1], this.returnedLinkSamples[0]];
            const targetArray = [this.targetLinkSamples[0], this.targetLinkSamples[1], this.targetLinkSamples[0]];
            this.myLinkModelService.processLinkResults(inputArray);
            const result = this.myLinkModelService.getNetworkLinkList();
            assert.deepStrictEqual(result, targetArray);
        });

    });

});