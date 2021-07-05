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

/* global L */

/** @global 
 * A list of leaflet icons
*/
const iconLinks = {
    "2x12A": L.icon({
        iconUrl: "/icons/2x12A.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x12B": L.icon({
        iconUrl: "/icons/2x12B.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x12J": L.icon({
        iconUrl: "/icons/2x12J.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x12K": L.icon({
        iconUrl: "/icons/2x12K.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x12L": L.icon({
        iconUrl: "/icons/2x12L.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x12M": L.icon({
        iconUrl: "/icons/2x12M.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x16A": L.icon({
        iconUrl: "/icons/2x16A.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x16B": L.icon({
        iconUrl: "/icons/2x16B.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x16J": L.icon({
        iconUrl: "/icons/2x16J.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x16K": L.icon({
        iconUrl: "/icons/2x16K.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x16L": L.icon({
        iconUrl: "/icons/2x16L.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "2x16M": L.icon({
        iconUrl: "/icons/2x16M.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x12A": L.icon({
        iconUrl: "/icons/3x12A.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x12B": L.icon({
        iconUrl: "/icons/3x12B.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x12J": L.icon({
        iconUrl: "/icons/3x12J.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x12K": L.icon({
        iconUrl: "/icons/3x12K.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x12L": L.icon({
        iconUrl: "/icons/3x12L.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x12M": L.icon({
        iconUrl: "/icons/3x12M.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x18A": L.icon({
        iconUrl: "/icons/3x18A.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x18B": L.icon({
        iconUrl: "/icons/3x18B.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x18J": L.icon({
        iconUrl: "/icons/3x18J.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x18K": L.icon({
        iconUrl: "/icons/3x18K.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x18L": L.icon({
        iconUrl: "/icons/3x18L.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x18M": L.icon({
        iconUrl: "/icons/3x18M.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x12A": L.icon({
        iconUrl: "/icons/4x12A.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x12B": L.icon({
        iconUrl: "/icons/4x12B.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x12J": L.icon({
        iconUrl: "/icons/4x12J.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x12K": L.icon({
        iconUrl: "/icons/4x12K.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x12L": L.icon({
        iconUrl: "/icons/4x12L.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x12M": L.icon({
        iconUrl: "/icons/4x12M.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x13A": L.icon({
        iconUrl: "/icons/4x13A.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x13B": L.icon({
        iconUrl: "/icons/4x13B.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x13J": L.icon({
        iconUrl: "/icons/4x13J.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x13K": L.icon({
        iconUrl: "/icons/4x13K.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x13L": L.icon({
        iconUrl: "/icons/4x13L.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x13M": L.icon({
        iconUrl: "/icons/4x13M.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x15A": L.icon({
        iconUrl: "/icons/4x15A.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x15B": L.icon({
        iconUrl: "/icons/4x15B.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x15J": L.icon({
        iconUrl: "/icons/4x15J.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x15K": L.icon({
        iconUrl: "/icons/4x15K.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x15L": L.icon({
        iconUrl: "/icons/4x15L.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "4x15M": L.icon({
        iconUrl: "/icons/4x15M.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x9A": L.icon({
        iconUrl: "/icons/3x9A.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x9B": L.icon({
        iconUrl: "/icons/3x9B.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x9J": L.icon({
        iconUrl: "/icons/3x9J.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x9K": L.icon({
        iconUrl: "/icons/3x9K.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x9L": L.icon({
        iconUrl: "/icons/3x9L.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    }),
    "3x9M": L.icon({
        iconUrl: "/icons/3x9M.svg",
        iconSize: [70, 56],
        iconAnchor: [35, 56]
    })
};


