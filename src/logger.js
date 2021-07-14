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

const winston = require("winston");

let logger;


if (process.env.NODE_ENV === "production"){
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console()
        ]
    });
}
else if (process.env.NODE_ENV === "test"){
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console()
        ],
        silent: true
    });
}
else {
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console()
        ]
    });
}

module.exports = logger;
