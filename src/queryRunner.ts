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

import * as azurestorage from "azure-storage";

/** @typedef QueryResult 
 * @type {object}
 * @property {object} result
 * @property {object} response
*/
export interface QueryResult{
    result: azurestorage.TableService.QueryEntitiesResult<unknown>,
    response: azurestorage.ServiceResponse
}

/** Run a single query against a table storage account 
 * @function RunQuery
 * @param {object} continuationToken - A continuation token to continue to run an existing table service query (Table storage queries return a maximum of 1000 results per partition and return a continuation token to collect further results after 100 results received)
 * @param {object} query - An azure-storage query object
 * @param {object} tableService - An azure-storage tableService object
 * @param {string} tableName - The name of the table-storage table to be queried
 * @returns {Promise<QueryResult>} the result of the query
*/
export function RunQuery(continuationToken: azurestorage.TableService.TableContinuationToken, query: azurestorage.TableQuery, tableService: azurestorage.TableService, tableName: string): Promise<QueryResult>{
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
 * @async
 * @function RunQueryToCompletion
 * @param {object} query - An azure-storage query object
 * @param {object} tableService - An azure-storage tableService object
 * @param {string} tableName - The name of the table-storage table to be queried 
 * @returns {Promise<string>}
 */
export async function RunQueryToCompletion(query: azurestorage.TableQuery, tableService: azurestorage.TableService, tableName: string): Promise<Array<object>>{
    let continuationToken = null;
    let fullResults: Array<object> = [];
    do{
        const result: QueryResult = await RunQuery(continuationToken as unknown as azurestorage.TableService.TableContinuationToken, query, tableService, tableName);
        continuationToken = result.result.continuationToken;
        fullResults = fullResults.concat(result.response.body as object);
    } while(continuationToken !== null)
    return fullResults;
}
