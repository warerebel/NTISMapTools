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

const vmsRequestHandler = require("../src/vmsRequestHandler");
const assert = require("assert");

describe("vmsRequestHandler", function(){

    before(function(){
        this.topLeft = {
            latitude: 52.099757,
            longitude: -0.632809
        };
        this.bottomRight = {
            latitude: 51.783135,
            longitude: -0.162830
        };
        this.fullVMSList = [
            {
                id: "0D3EDF9EB3107BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7556A",
                vmsUnitElectronicAddress: "024/4/012/117",
                textDisplay: "2x12",
                latitude: 52.150344,
                longitude: -0.860880
            },
            {
                id: "0D3EDF9EB3107BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7556A",
                vmsUnitElectronicAddress: "024/4/012/117",
                textDisplay: "2x12",
                latitude: 51.879882,
                longitude: -0.451366
            },
            {
                id: "0D3EDF9EB3107BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7556A",
                vmsUnitElectronicAddress: "024/4/012/117",
                textDisplay: "2x12",
                latitude: 51.864620,
                longitude: -0.374411
            },
            {
                id: "0D3EDF9EB3107BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7556A",
                vmsUnitElectronicAddress: "024/4/012/117",
                textDisplay: "2x12",
                latitude: 51.706608,
                longitude: -0.271467
            }
        ];
        this.targetVMSList = [
            {
                id: "0D3EDF9EB3107BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7556A",
                vmsUnitElectronicAddress: "024/4/012/117",
                textDisplay: "2x12",
                latitude: 51.879882,
                longitude: -0.451366
            },
            {
                id: "0D3EDF9EB3107BB9E0533CC711AC4D20",
                version: "14.12",
                vmsUnitIdentifier: "M6/7556A",
                vmsUnitElectronicAddress: "024/4/012/117",
                textDisplay: "2x12",
                latitude: 51.864620,
                longitude: -0.374411
            }
        ];
    });

    beforeEach(function(){
        const vmsList = this.fullVMSList;
        this.modelService = {
            getVMSSiteList: function(){return vmsList;}
        };
        this.myVMSRequestHandler = new vmsRequestHandler(this.modelService);
    });

    describe("getAllVMS", function(){

        it("returns a full list of vms", function(){
            const result = this.myVMSRequestHandler.getAllVMS();
            assert.deepStrictEqual(result, this.fullVMSList);
        });

    });

    describe("getVMSInBoundingBox", function(){
        
        it("returns the vms inside a bounding box", function(){
            const result = this.myVMSRequestHandler.getVMSInBoundingBox(this.topLeft, this.bottomRight);
            assert.deepStrictEqual(result, this.targetVMSList);
        });
    });

});
