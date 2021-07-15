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
const logger = require("../logger");
const nodeModelService = require("../networkModelNodeService");
const networkModelNodeRequestHandler = require("../networkModelNodeRequestHandler");
const router = express.Router();

const myNodeModelService = new nodeModelService();
/* istanbul ignore next */
myNodeModelService.getNetworkNodesFromTableStorage().catch((error) => {
    logger.error(error);
});

const myNetworkModelNodeRequesthandler = new networkModelNodeRequestHandler(myNodeModelService);

/** Get all network nodes
 * @method get
 * @param {object} req - An Express request object
 * @param {object} res - An Express response object
 */
router.get("/all", function(req, res){
    res.json(myNetworkModelNodeRequesthandler.getAllNetworkNodes());
});

/** Get A specific node
 * @method Get
 * @param {object} req - An Express request object
 * @param {object} res - An Express response object
 */
router.post("/byid", function(req, res){
    if(typeof req.body.id === "string"){
        res.json(myNetworkModelNodeRequesthandler.getNode(req.body.id));
    } else {
        res.json([]);
    }
});

module.exports = router;
