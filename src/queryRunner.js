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

class QueryRunner{

    /** Run a single query against a table storage account
     * @static
     * @method RunQuery
     * @param {object} continuationToken - A continuation token to continue to run an existing table service query (Table storage queries return a maximum of 1000 results per partition and return a continuation token to collect further results after 100 results received)
     * @param {object} query - An azure-storage query object
     * @param {object} tableService - An azure-storage tableService object
     * @param {string} tableName - The name of the table-storage table to be queried
     * @returns {Promise<object>} the result and response of the table query
     */
    static RunQuery(continuationToken, query, tableService, tableName){
        return new Promise( (resolve, reject) => {
            tableService.queryEntities(tableName, query, continuationToken, (error, result, response) => {
                if(error)
                    reject(error);
                else
                    resolve({result: result, response: response});
            });
        });
    }

    /** Run a provided query, re-running for each continuation token received, cachin all results in memory until all results are returned in an array
     * @static
     * @async
     * @function RunQueryToCompletion
     * @param {object} query - An azure-storage query object
     * @param {object} tableService - An azure-storage tableService object
     * @param {string} tableName - The name of the table-storage table to be queried 
     * @returns {Promise<array>} - An array of all items returned from the query
     */
    static async RunQueryToCompletion(query, tableService, tableName){
        let continuationToken = null;
        let fullResults = [];
        do{
            const result = await QueryRunner.RunQuery(continuationToken, query, tableService, tableName);
            continuationToken = result.result.continuationToken;
            fullResults = fullResults.concat(result.response.body);
        } while(continuationToken !== null);
        return fullResults;
    }
}

module.exports = QueryRunner;
