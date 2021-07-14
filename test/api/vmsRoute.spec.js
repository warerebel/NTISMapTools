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

const chai = require("chai");
const chaihttp = require("chai-http");
const assert = require("assert");
const routeStubs = require("./routeStubs");
routeStubs();

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
