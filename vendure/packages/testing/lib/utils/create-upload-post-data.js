"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadPostData = createUploadPostData;
const graphql_1 = require("graphql");
/**
 * Creates a data structure which can be used to make a POST request to upload
 * files to a mutation using the Upload type.
 *
 * @param mutation - The GraphQL document for a mutation that takes an Upload
 * type as an input
 * @param filePaths - Either a single path or an array of paths to the files
 * that should be uploaded
 * @param mapVariables - A function that will receive `filePaths` and return an
 * object containing the input variables for the mutation, where every field
 * with the Upload type has the value `null`.
 * @returns an UploadPostData object.
 */
function createUploadPostData(mutation, filePaths, mapVariables) {
    const operationDef = mutation.definitions.find(d => d.kind === graphql_1.Kind.OPERATION_DEFINITION);
    const filePathsArray = Array.isArray(filePaths) ? filePaths : [filePaths];
    const variables = mapVariables(filePaths);
    const postData = {
        operations: {
            operationName: operationDef.name ? operationDef.name.value : 'AnonymousMutation',
            variables,
            query: (0, graphql_1.print)(mutation),
        },
        map: objectPath(variables).reduce((acc, path, i) => (Object.assign(Object.assign({}, acc), { [i.toString()]: path })), {}),
        filePaths: filePathsArray.map((filePath, i) => ({
            name: i.toString(),
            file: filePath,
        })),
    };
    return postData;
}
/**
 * This function visits each property in the `variables` object, including
 * nested ones, and returns the path of each null value, in order.
 *
 * @example
 * // variables:
 * {
 *   input: {
 *     name: "George's Pots and Pans",
 *     logo: null,
 *     user: {
 *       profilePicture: null
 *     }
 *   }
 * }
 * // return value:
 * ['variables.input.logo', 'variables.input.user.profilePicture']
 */
function objectPath(variables) {
    const pathsToNulls = [];
    const checkValue = (pathSoFar, value) => {
        if (value === null) {
            pathsToNulls.push(pathSoFar);
        }
        else if (typeof value === 'object') {
            for (const key of Object.getOwnPropertyNames(value)) {
                checkValue(`${pathSoFar}.${key}`, value[key]);
            }
        }
    };
    checkValue('variables', variables);
    return pathsToNulls;
}
//# sourceMappingURL=create-upload-post-data.js.map