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
const compression = require("compression");
const helmet = require("helmet");
const vmsRoute = require("./src/routes/vmsRoute");
const networkLinksRoute = require("./src/routes/networkLinkRoute");
const networkNodesRoute = require("./src/routes/networkNodeRoute");
const openLRRoute = require("./src/routes/openlrRoute");
const logger = require("./src/logger");

const app = express();

app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "connect-src": ["'self'"],
        "script-src": ["'self'", "cdn.jsdelivr.net", "unpkg.com"],
        "img-src": ["'self'", "*.tile.openstreetmap.org", "unpkg.com", "data:"],
        "frame-ancestors": ["*.id.repl.co", "replit.com"]
    }
}));
app.use(compression());
app.use(express.static("static"));
app.use(express.json());

const port = process.env.PORT || 8000;

app.set("view engine", "pug");

app.get("/", function (req, res) {
    res.render("index", {index: true});
});

app.get("/openlr", function (req, res) {
    res.render("openlr", {openlr: true});
});

app.use("/vms", vmsRoute);
app.use("/links", networkLinksRoute);
app.use("/nodes", networkNodesRoute);
app.use("/openlr", openLRRoute);

app.listen(port, () => {
    logger.info(`Started NTISMapTools app, listening on port: ${port}`);
});

module.exports = app;
