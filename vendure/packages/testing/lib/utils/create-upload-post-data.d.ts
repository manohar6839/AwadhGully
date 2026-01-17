import { DocumentNode } from 'graphql';
export interface UploadPostData<V = any> {
    /**
     * Data from a GraphQL document that takes the Upload type as input
     */
    operations: {
        operationName: string;
        variables: V;
        query: string;
    };
    /**
     * A map from index values to variable paths. Maps files in the `filePaths`
     * array to fields with the Upload type in the GraphQL mutation input.
     *
     * If this was the GraphQL mutation input type:
     * ```graphql
     * input ImageReceivingInput {
     *   bannerImage: Upload!
     *   logo: Upload!
     * }
     * ```
     *
     * And this was the GraphQL mutation:
     * ```graphql
     * addSellerImages(input: ImageReceivingInput!): Seller
     * ```
     *
     * Then this would be the value for `map`:
     * ```js
     * {
     *   0: 'variables.input.bannerImage',
     *   1: 'variables.input.logo'
     * }
     * ```
     */
    map: {
        [index: number]: string;
    };
    /**
     * Array of file paths. Mapped to a GraphQL mutation input variable by
     * `map`.
     */
    filePaths: Array<{
        /**
         * Index of the file path as a string.
         */
        name: string;
        /**
         * The actual file path
         */
        file: string;
    }>;
}
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
export declare function createUploadPostData<P extends string[] | string, V>(mutation: DocumentNode, filePaths: P, mapVariables: (filePaths: P) => V): UploadPostData<V>;
