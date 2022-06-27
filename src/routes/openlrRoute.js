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
const http = require("http");
const router = express.Router();

const openlrapi = process.env.OPENLR_API;

/** Get route for an openLR reference 
 * 
*/
router.get("/decode", async (req, res) => {
    const ref = req.query.reference;
    http.get(`${openlrapi}/decode?reference=${encodeURIComponent(ref)}`, (response) => {
        let data = "";
        response.on("data", (chunk) => {
            data += chunk;
        });
        response.on("end", (chunk) => {
            if(chunk)
                data += chunk;
            res.send(data);
        });
    }).on("error", (error) => {res.send(error);});
});

module.exports = router;
