"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePermissionEnum = generatePermissionEnum;
var stitch_1 = require("@graphql-tools/stitch");
var graphql_1 = require("graphql");
var constants_1 = require("../../common/constants");
var PERMISSION_DESCRIPTION = "@description\nPermissions for administrators and customers. Used to control access to\nGraphQL resolvers via the {@link Allow} decorator.\n\n## Understanding Permission.Owner\n\n`Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only\nbe accessible to the \"owner\" of that resource.\n\nFor example, the Shop API `activeCustomer` query resolver should only return the Customer object for the \"owner\" of that Customer, i.e.\nbased on the activeUserId of the current session. As a result, the resolver code looks like this:\n\n@example\n```TypeScript\n\\@Query()\n\\@Allow(Permission.Owner)\nasync activeCustomer(\\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {\n  const userId = ctx.activeUserId;\n  if (userId) {\n    return this.customerService.findOneByUserId(ctx, userId);\n  }\n}\n```\n\nHere we can see that the \"ownership\" must be enforced by custom logic inside the resolver. Since \"ownership\" cannot be defined generally\nnor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner\nof the resource has access. If not, then it is the equivalent of using `Permission.Public`.\n\n\n@docsCategory common";
/**
 * Generates the `Permission` GraphQL enum based on the default & custom permission definitions.
 */
function generatePermissionEnum(schema, customPermissions) {
    var allPermissionsMetadata = (0, constants_1.getAllPermissionsMetadata)(customPermissions);
    var values = {};
    var i = 0;
    for (var _i = 0, allPermissionsMetadata_1 = allPermissionsMetadata; _i < allPermissionsMetadata_1.length; _i++) {
        var entry = allPermissionsMetadata_1[_i];
        values[entry.name] = {
            value: i,
            description: entry.description,
        };
        i++;
    }
    var permissionsEnum = new graphql_1.GraphQLEnumType({
        name: 'Permission',
        description: PERMISSION_DESCRIPTION,
        values: values,
    });
    return (0, stitch_1.stitchSchemas)({
        subschemas: [schema],
        types: [permissionsEnum],
        typeMergingOptions: { validationSettings: { validationLevel: stitch_1.ValidationLevel.Off } },
    });
}
