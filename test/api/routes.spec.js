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

const returnedVMSList = [
    {
        PartitionKey: "14.12",
        RowKey: "0D3EDF9EB30F7BB9E0533CC711AC4D20",
        vmsRecord: "{\"vmsRecord\":{\"vmsDescription\":{\"text\":\"2x12 VMS\",\"attrs\":{\"lang\":\"en\"}},\"vmsType\":\"monochromeGraphic\",\"vmsTypeCode\":\"101\",\"vmsTextDisplayCharacteristics\":{\"maxNumberOfCharacters\":\"12\",\"maxNumberOfRows\":\"2\"},\"vmsLocation\":{\"locationForDisplay\":{\"latitude\":\"53.8032993199717\",\"longitude\":\"-2.69387568112903\"},\"pointAlongLinearElement\":{\"linearElement\":{\"linearElementReferenceModel\":\"NTIS_Network_Links\",\"linearElementReferenceModelVersion\":\"14.12\",\"linearElementIdentifier\":\"117016102\",\"attrs\":{\"xsi:type\":\"LinearElementByCode\"}},\"distanceAlongLinearElement\":{\"distanceAlong\":\"1162\",\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementStart\"}}},\"attrs\":{\"xsi:type\":\"Point\"}}},\"attrs\":{\"vmsIndex\":\"0\"}}",
        vmsUnitElectronicAddress: "024/4/012/112",
        vmsUnitIdentifier: "M6/7558B"
    },
    {
        PartitionKey: "14.12",
        RowKey: "0D3EDF9EB3107BB9E0533CC711AC4D20",
        vmsRecord: "{\"vmsRecord\":{\"vmsDescription\":{\"text\":\"2x12 VMS\",\"attrs\":{\"lang\":\"en\"}},\"vmsType\":\"monochromeGraphic\",\"vmsTypeCode\":\"101\",\"vmsTextDisplayCharacteristics\":{\"maxNumberOfCharacters\":\"12\",\"maxNumberOfRows\":\"2\"},\"vmsLocation\":{\"locationForDisplay\":{\"latitude\":\"53.8018333237198\",\"longitude\":\"-2.69248493889856\"},\"pointAlongLinearElement\":{\"linearElement\":{\"linearElementReferenceModel\":\"NTIS_Network_Links\",\"linearElementReferenceModelVersion\":\"14.12\",\"linearElementIdentifier\":\"117016001\",\"attrs\":{\"xsi:type\":\"LinearElementByCode\"}},\"distanceAlongLinearElement\":{\"distanceAlong\":\"2598\",\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementStart\"}}},\"attrs\":{\"xsi:type\":\"Point\"}}},\"attrs\":{\"vmsIndex\":\"0\"}}",
        vmsUnitElectronicAddress: "024/4/012/117",
        vmsUnitIdentifier: "M6/7556A"
    },
    {
        PartitionKey: "14.12",
        RowKey: "0D3EDF9EB3117BB9E0533CC711AC4D20",
        vmsRecord: "{\"vmsRecord\":{\"vmsDescription\":{\"text\":\"2x12 VMS\",\"attrs\":{\"lang\":\"en\"}},\"vmsType\":\"monochromeGraphic\",\"vmsTypeCode\":\"101\",\"vmsTextDisplayCharacteristics\":{\"maxNumberOfCharacters\":\"12\",\"maxNumberOfRows\":\"2\"},\"vmsLocation\":{\"locationForDisplay\":{\"latitude\":\"53.79854695901\",\"longitude\":\"-2.68565946350349\"},\"pointAlongLinearElement\":{\"linearElement\":{\"linearElementReferenceModel\":\"NTIS_Network_Links\",\"linearElementReferenceModelVersion\":\"14.12\",\"linearElementIdentifier\":\"117016001\",\"attrs\":{\"xsi:type\":\"LinearElementByCode\"}},\"distanceAlongLinearElement\":{\"distanceAlong\":\"2015\",\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementStart\"}}},\"attrs\":{\"xsi:type\":\"Point\"}}},\"attrs\":{\"vmsIndex\":\"0\"}}",
        vmsUnitElectronicAddress: "024/4/012/131",
        vmsUnitIdentifier: "M6/7550A"
    },
    {
        PartitionKey: "14.12",
        RowKey: "0D3EDF9EB3127BB9E0533CC711AC4D20",
        vmsRecord: "{\"vmsRecord\":{\"vmsDescription\":{\"text\":\"2x12 VMS\",\"attrs\":{\"lang\":\"en\"}},\"vmsType\":\"monochromeGraphic\",\"vmsTypeCode\":\"101\",\"vmsTextDisplayCharacteristics\":{\"maxNumberOfCharacters\":\"12\",\"maxNumberOfRows\":\"2\"},\"vmsLocation\":{\"locationForDisplay\":{\"latitude\":\"53.8056022525714\",\"longitude\":\"-2.6966318285375\"},\"pointAlongLinearElement\":{\"linearElement\":{\"linearElementReferenceModel\":\"NTIS_Network_Links\",\"linearElementReferenceModelVersion\":\"14.12\",\"linearElementIdentifier\":\"117011901\",\"attrs\":{\"xsi:type\":\"LinearElementByCode\"}},\"distanceAlongLinearElement\":{\"distanceAlong\":\"63\",\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementStart\"}}},\"attrs\":{\"xsi:type\":\"Point\"}}},\"attrs\":{\"vmsIndex\":\"0\"}}",
        vmsUnitElectronicAddress: "024/4/012/137",
        vmsUnitIdentifier: "M6/7561A"
    },
    {
        PartitionKey: "14.12",
        RowKey: "0D3EDF9EB3137BB9E0533CC711AC4D20",
        vmsRecord: "{\"vmsRecord\":{\"vmsDescription\":{\"text\":\"2x12 VMS\",\"attrs\":{\"lang\":\"en\"}},\"vmsType\":\"monochromeGraphic\",\"vmsTypeCode\":\"101\",\"vmsTextDisplayCharacteristics\":{\"maxNumberOfCharacters\":\"12\",\"maxNumberOfRows\":\"2\"},\"vmsLocation\":{\"locationForDisplay\":{\"latitude\":\"53.8033909462548\",\"longitude\":\"-2.69357351759342\"},\"pointAlongLinearElement\":{\"linearElement\":{\"linearElementReferenceModel\":\"NTIS_Network_Links\",\"linearElementReferenceModelVersion\":\"14.12\",\"linearElementIdentifier\":\"117016101\",\"attrs\":{\"xsi:type\":\"LinearElementByCode\"}},\"distanceAlongLinearElement\":{\"distanceAlong\":\"905\",\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementStart\"}}},\"attrs\":{\"xsi:type\":\"Point\"}}},\"attrs\":{\"vmsIndex\":\"0\"}}",
        vmsUnitElectronicAddress: "024/4/012/107",
        vmsUnitIdentifier: "M6/7558K"
    },
    {
        PartitionKey: "14.12",
        RowKey: "0D3EDF9EB3527BB9E0533CC711AC4D20",
        vmsRecord: "{\"vmsRecord\":{\"vmsDescription\":{\"text\":\"4x15 VMS MS4\",\"attrs\":{\"lang\":\"en\"}},\"vmsType\":\"colourGraphic\",\"vmsTypeCode\":\"115\",\"vmsTextDisplayCharacteristics\":{\"maxNumberOfCharacters\":\"12\",\"maxNumberOfRows\":\"4\"},\"vmsLocation\":{\"locationForDisplay\":{\"latitude\":\"53.3105231988457\",\"longitude\":\"-1.28349006286895\"},\"pointAlongLinearElement\":{\"linearElement\":{\"linearElementReferenceModel\":\"NTIS_Network_Links\",\"linearElementReferenceModelVersion\":\"14.12\",\"linearElementIdentifier\":\"114008802\",\"attrs\":{\"xsi:type\":\"LinearElementByCode\"}},\"distanceAlongLinearElement\":{\"distanceAlong\":\"273\",\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementStart\"}}},\"attrs\":{\"xsi:type\":\"Point\"}}},\"attrs\":{\"vmsIndex\":\"0\"}}",
        vmsUnitElectronicAddress: "012/3/127/003",
        vmsUnitIdentifier: "M1/4420B"
    },
    {
        PartitionKey: "14.12",
        RowKey: "0D3EDF9EB3537BB9E0533CC711AC4D20",
        vmsRecord: "{\"vmsRecord\":{\"vmsDescription\":{\"text\":\"4x15 VMS MS4\",\"attrs\":{\"lang\":\"en\"}},\"vmsType\":\"colourGraphic\",\"vmsTypeCode\":\"115\",\"vmsTextDisplayCharacteristics\":{\"maxNumberOfCharacters\":\"12\",\"maxNumberOfRows\":\"4\"},\"vmsLocation\":{\"locationForDisplay\":{\"latitude\":\"53.3096547073542\",\"longitude\":\"-1.28405987887439\"},\"pointAlongLinearElement\":{\"linearElement\":{\"linearElementReferenceModel\":\"NTIS_Network_Links\",\"linearElementReferenceModelVersion\":\"14.12\",\"linearElementIdentifier\":\"123015301\",\"attrs\":{\"xsi:type\":\"LinearElementByCode\"}},\"distanceAlongLinearElement\":{\"distanceAlong\":\"2270\",\"attrs\":{\"xsi:type\":\"DistanceFromLinearElementStart\"}}},\"attrs\":{\"xsi:type\":\"Point\"}}},\"attrs\":{\"vmsIndex\":\"0\"}}",
        vmsUnitElectronicAddress: "012/3/127/103",
        vmsUnitIdentifier: "M1/4419A"
    }
];

const returnedNetworkLinks = [
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

const vmsModelService = require("../../src/vmsModelService");
const networkModelLinkService = require("../../src/networkModelLinkService");
const chai = require("chai");
const chaihttp = require("chai-http");
const sinon = require("sinon");
const assert = require("assert");

sinon.stub(vmsModelService.prototype, "getVMSModelTableService").returns({
    queryEntities: sinon.fake.yields(null, {continuationToken: null}, {body: {value: returnedVMSList}})
});
sinon.stub(networkModelLinkService.prototype, "getNetworkModelTableService").returns({
    queryEntities: sinon.fake.yields(null, {continuationToken: null}, {body: {value: returnedNetworkLinks}})
});

const app = require("../../index");
chai.use(chaihttp);

describe("vmsRoute", function(){

    before(function(){

        this.finalResults = [
            {
                id: "0D3EDF9EB3527BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M1/4420B",
                vmsUnitElectronicAddress: "012/3/127/003",
                textDisplay: "4x12",
                latitude: 53.3105231988457,
                longitude: -1.28349006286895,
                networkLink: "114008802"
            },
            {
                id: "0D3EDF9EB3537BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M1/4419A",
                vmsUnitElectronicAddress: "012/3/127/103",
                textDisplay: "4x12",
                latitude: 53.3096547073542,
                longitude: -1.28405987887439,
                networkLink: "123015301"
            }
        ];
        this.allResults = [
            {
                id: "0D3EDF9EB30F7BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7558B",
                vmsUnitElectronicAddress: "024/4/012/112",
                textDisplay: "2x12",
                latitude: 53.8032993199717,
                longitude: -2.69387568112903,
                networkLink: "117016102"
            },
            {
                id: "0D3EDF9EB3107BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7556A",
                vmsUnitElectronicAddress: "024/4/012/117",
                textDisplay: "2x12",
                latitude: 53.8018333237198,
                longitude: -2.69248493889856,
                networkLink: "117016001"
            },
            {
                id: "0D3EDF9EB3117BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7550A",
                vmsUnitElectronicAddress: "024/4/012/131",
                textDisplay: "2x12",
                latitude: 53.79854695901,
                longitude: -2.68565946350349,
                networkLink: "117016001"
            },
            {
                id: "0D3EDF9EB3127BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7561A",
                vmsUnitElectronicAddress: "024/4/012/137",
                textDisplay: "2x12",
                latitude: 53.8056022525714,
                longitude: -2.6966318285375,
                networkLink: "117011901"
            },
            {
                id: "0D3EDF9EB3137BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7558K",
                vmsUnitElectronicAddress: "024/4/012/107",
                textDisplay: "2x12",
                latitude: 53.8033909462548,
                longitude: -2.69357351759342,
                networkLink: "117016101"
            },
            {
                id: "0D3EDF9EB3527BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M1/4420B",
                vmsUnitElectronicAddress: "012/3/127/003",
                textDisplay: "4x12",
                latitude: 53.3105231988457,
                longitude: -1.28349006286895,
                networkLink: "114008802"
            },
            {
                id: "0D3EDF9EB3537BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M1/4419A",
                vmsUnitElectronicAddress: "012/3/127/103",
                textDisplay: "4x12",
                latitude: 53.3096547073542,
                longitude: -1.28405987887439,
                networkLink: "123015301"
            }
        ];
        
        this.topLeft = {
            latitude: 53.363460,
            longitude: -1.367715
        };
        this.bottomRight = {
            latitude: 53.247344,
            longitude: -1.172126
        };
    });

    it("gets a list of vms in a bounding box", function(done){
        const me = this;
        this.server = chai.request(app)
            .post("/vms/boundingBox")
            .set("Content-Type", "application/json")
            .send({topLeft: this.topLeft, bottomRight: this.bottomRight})
            .end(function(error, response){
                assert.deepStrictEqual(error, null);
                assert.deepStrictEqual(response.status, 200);
                assert.deepStrictEqual(response.body, me.finalResults);
                done();
            });
    });

    it("rejects a request with invalid bounding box", function(done){
        this.server = chai.request(app)
            .post("/vms/boundingBox")
            .set("Content-Type", "application/json")
            .send({topLeft: 11, bottomRight: this.bottomRight})
            .end(function(error, response){
                assert.deepStrictEqual(response.status, 500);
                done();
            });
    });

    it("gets all vms", function(done){
        const me = this;
        this.server = chai.request(app)
            .get("/vms/all")
            .end(function(error, response){
                assert.deepStrictEqual(error, null);
                assert.deepStrictEqual(response.status, 200);
                assert.deepStrictEqual(response.body, me.allResults);
                done();
            });
    });
});

describe("networkLinkRoute", function(){

    before(function(){

        this.allResults = [
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

    it("gets all links", function(done){
        const me = this;
        this.server = chai.request(app)
            .get("/links/all")
            .end(function(error, response){
                assert.deepStrictEqual(error, null);
                assert.deepStrictEqual(response.status, 200);
                assert.deepStrictEqual(response.body, me.allResults);
                done();
            });
    });
});