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

const sinon = require("sinon");
const assert = require("assert");
const QueryRunner = require("../../src/queryRunner");

describe("RunQuery", function(){
    
    afterEach(function(){
        sinon.restore();
    });

    it("Resolves a result object after a successful table query", async function (){
        const tableServiceFake = sinon.fake.yields(null, ["result"], ["response"]);
        const result = await QueryRunner.RunQuery({}, {}, {queryEntities: tableServiceFake}, "test");
        assert.deepStrictEqual(result.result, ["result"]);
        assert.deepStrictEqual(result.response, ["response"]);
    });
});

describe("RunQueryToCompletion", function(){

    afterEach(function(){
        sinon.restore();
    });

    it("Runs to completion for no continuation token", async function(){
        const resultObject = {
            entries: [],
            continuationToken: null
        };
        const myStub = sinon.stub(QueryRunner, "RunQuery");
        myStub.onFirstCall().resolves({result: resultObject, response: {body: {value: []}}});
        await QueryRunner.RunQueryToCompletion({}, {}, "test");
        assert.deepStrictEqual(myStub.callCount, 1);
    });

    it("Runs to completion with several continuation tokens", async function(){
        const resultObjectOne = {
            entries: [],
            continuationToken: 1234
        };
        const resultObjectTwo = {
            entries: [],
            continuationToken: 4567
        };
        const resultObjectThree = {
            entries: [],
            continuationToken: null
        };
        const myStub = sinon.stub(QueryRunner, "RunQuery");
        myStub.onFirstCall().resolves({result: resultObjectOne, response: {body: {value: []}}});
        myStub.onSecondCall().resolves({result: resultObjectTwo, response: {body: {value: []}}});
        myStub.onThirdCall().resolves({result: resultObjectThree, response: {body: {value: []}}});
        await QueryRunner.RunQueryToCompletion({}, {}, "test");
        assert.deepStrictEqual(myStub.callCount, 3);
    });

    it("Cleanly propogates errors back to the calling function", async function(){
        let called = false;
        const tableServiceFake = sinon.fake.yields(new Error("There has been a bad error"));
        await QueryRunner.RunQueryToCompletion({}, {queryEntities: tableServiceFake}, "test").catch((error) => {
            assert.deepStrictEqual(error.message, "There has been a bad error");
            called = true;
        });
        assert.deepStrictEqual(called, true);
    });
});
