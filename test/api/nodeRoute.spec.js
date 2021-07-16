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

    it("gets all nodes", function(done){
        const me = this;
        this.server = chai.request(app)
            .get("/nodes/all")
            .end(function(error, response){
                assert.deepStrictEqual(error, null);
                assert.deepStrictEqual(response.status, 200);
                assert.deepStrictEqual(response.body, me.allResults);
                done();
            });
    });

    it("gets one node", function(done){
        const me = this;
        this.server = chai.request(app)
            .post("/nodes/byid")
            .send({id: "1010002"})
            .end(function(error, response){
                assert.deepStrictEqual(error, null);
                assert.deepStrictEqual(response.status, 200);
                assert.deepStrictEqual(response.body, me.allResults[1]);
                done();
            });
    });

    it("receives and error for an incorrect argument", function(done){
        const me = this;
        this.server = chai.request(app)
            .post("/nodes/byid")
            .send({})
            .end(function(error, response){
                assert.deepStrictEqual(error, null);
                assert.deepStrictEqual(response.status, 400);
                assert.deepStrictEqual(response.body, {error: "Expected a string id"});
                done();
            });
    });

});
