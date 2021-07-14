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

    it("matches a search string", function(done){
        const me = this;
        this.server = chai.request(app)
            .post("/links/match")
            .send({string: "A38"})
            .end(function(error, response){
                assert.deepStrictEqual(error, null);
                assert.deepStrictEqual(response.status, 200);
                assert.deepStrictEqual(response.body, [me.allResults[1].description]);
                done();
            });
    });

});
