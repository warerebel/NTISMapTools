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

const express = require("express");
const vmsRequestHandler = require("../vmsRequestHandler");
const vmsModelService = require("../vmsModelService");
const vmsRequestValidator = require("../validations/vmsRequestValidator");
const router = express.Router();

const myVmsModelService = new vmsModelService();
myVmsModelService.getVMSFromTableStorage().catch((error) => {
    //console.log(error);
});

const myVmsRequesthandler = new vmsRequestHandler(myVmsModelService);

/** Get all VMS signs
 * @method get
 * @param {object} req - An Express request object
 * @param {object} res - An Express response object
 */
router.get("/all", function(req, res){
    res.json(myVmsRequesthandler.getAllVMS());
});

/** Get VMS signs inside a bounding box
 * @method get
 * @param {object} req - An Express request object
 * @param {object} res - An Express response object
 */
router.post("/boundingBox", function(req, res, next){
    const validationResult = vmsRequestValidator.boundingBox.validate(req.body);
    if(validationResult.length > 0)
        next(validationResult);
    const result = myVmsRequesthandler.getVMSInBoundingBox(req.body.topLeft, req.body.bottomRight);
    res.json(result);
});

module.exports = router;
