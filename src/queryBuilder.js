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

const azurestorage = require("azure-storage");

/**
 * @typedef queryParameter - The parameter item passed in an array to queryBuilder
 * @property {string} field - The table storage field to search
 * @property {srting} comparator - The comparator to use - for example: eq, ge, le, lt, gt
 * @property {string} value - The value to search for
 */

class queryBuilder{

    /** build an Azure query object from the provided parameters
     * @static
     * @method buildQuery
     * @param {Array<queryParameter>} parameters- An array of objects to build the query
     * @returns {object} - An azure storage table query object
     */
    static buildQuery(parameters){
        const initialQueryString = parameters[0].field.concat(" ").concat(parameters[0].comparator).concat(" ?");
        const query = new azurestorage.TableQuery().where(initialQueryString, parameters[0].value);
        for(let i = 1; i < parameters.length; i++){
            let queryString = parameters[i].field.concat(" ").concat(parameters[i].comparator).concat(" ?");
            query.and(queryString, parameters[i].value);
        }
        return query;
    }
}

module.exports = queryBuilder;
