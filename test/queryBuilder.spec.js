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

const queryBuilder = require("../src/queryBuilder");
const assert = require("assert");

describe("buildAndQuery", function(){

    it("builds a single where query", function(){
        const parameter = {
            field: "PartitionKey",
            comparator: "eq",
            value: "1234"
        };
        const parameters = [parameter];
        const query = queryBuilder.buildAndQuery(parameters);
        assert.deepStrictEqual(query._where[0], "PartitionKey eq '1234'");
    });

    it("builds a multiple 'and' where query", function(){
        const parameterOne = {
            field: "PartitionKey",
            comparator: "eq",
            value: "1234"
        };
        const parameterTwo = {
            field: "PartitionKey",
            comparator: "gt",
            value: "4567"
        };
        const parameterThree = {
            field: "RowKey",
            comparator: "le",
            value: "9010"
        };
        const parameters = [parameterOne, parameterTwo, parameterThree];
        const query = queryBuilder.buildAndQuery(parameters);
        assert.deepStrictEqual(query._where[0], "PartitionKey eq '1234'");
        assert.deepStrictEqual(query._where[1], " and PartitionKey gt '4567'");
        assert.deepStrictEqual(query._where[2], " and RowKey le '9010'");
    });

});