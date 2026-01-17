"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlValueTransformer = void 0;
var graphql_1 = require("graphql");
/**
 * This class is used to transform the values of input variables or an output object.
 */
var GraphqlValueTransformer = /** @class */ (function () {
    function GraphqlValueTransformer(schema) {
        this.schema = schema;
        this.outputCache = new WeakMap();
        this.inputCache = new WeakMap();
    }
    /**
     * Transforms the values in the `data` object into the return value of the `visitorFn`.
     */
    GraphqlValueTransformer.prototype.transformValues = function (typeTree, data, visitorFn) {
        var _this = this;
        this.traverse(data, function (key, value, path) {
            var typeTreeNode = _this.getTypeNodeByPath(typeTree, path);
            var type = (typeTreeNode && typeTreeNode.type);
            return visitorFn(value, type);
        });
    };
    /**
     * Constructs a tree of TypeTreeNodes for the output of a GraphQL operation.
     */
    GraphqlValueTransformer.prototype.getOutputTypeTree = function (document) {
        var _this = this;
        var cached = this.outputCache.get(document);
        if (cached) {
            return cached;
        }
        var typeInfo = new graphql_1.TypeInfo(this.schema);
        var typeTree = {
            operation: {},
            fragments: {},
        };
        var rootNode = {
            type: undefined,
            isList: false,
            parent: typeTree,
            fragmentRefs: [],
            children: {},
        };
        typeTree.operation = rootNode;
        var currentNode = rootNode;
        var visitor = {
            enter: function (node) {
                var _a, _b;
                var type = typeInfo.getType();
                var fieldDef = typeInfo.getFieldDef();
                if (node.kind === 'Field') {
                    var newNode = {
                        type: (type && (0, graphql_1.getNamedType)(type)) || undefined,
                        isList: _this.isList(type),
                        fragmentRefs: [],
                        parent: currentNode,
                        children: {},
                    };
                    currentNode.children[(_b = (_a = node.alias) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : node.name.value] = newNode;
                    currentNode = newNode;
                }
                if (node.kind === 'FragmentSpread') {
                    currentNode.fragmentRefs.push(node.name.value);
                }
                if (node.kind === 'FragmentDefinition') {
                    var rootFragmentNode = {
                        type: undefined,
                        isList: false,
                        fragmentRefs: [],
                        parent: typeTree,
                        children: {},
                    };
                    currentNode = rootFragmentNode;
                    typeTree.fragments[node.name.value] = rootFragmentNode;
                }
            },
            leave: function (node) {
                if (node.kind === 'Field') {
                    if (!_this.isTypeTree(currentNode.parent)) {
                        currentNode = currentNode.parent;
                    }
                }
                if (node.kind === 'FragmentDefinition') {
                    currentNode = rootNode;
                }
            },
        };
        for (var _i = 0, _a = document.definitions; _i < _a.length; _i++) {
            var operation = _a[_i];
            (0, graphql_1.visit)(operation, (0, graphql_1.visitWithTypeInfo)(typeInfo, visitor));
        }
        this.outputCache.set(document, typeTree);
        return typeTree;
    };
    /**
     * Constructs a tree of TypeTreeNodes for the input variables of a GraphQL operation.
     */
    GraphqlValueTransformer.prototype.getInputTypeTree = function (definition) {
        var _this = this;
        var cached = this.inputCache.get(definition);
        if (cached) {
            return cached;
        }
        var typeInfo = new graphql_1.TypeInfo(this.schema);
        var typeTree = {
            operation: {},
            fragments: {},
        };
        var rootNode = {
            type: undefined,
            isList: false,
            parent: typeTree,
            fragmentRefs: [],
            children: {},
        };
        typeTree.operation = rootNode;
        var currentNode = rootNode;
        var visitor = {
            enter: function (node) {
                if (node.kind === 'Argument') {
                    var type = typeInfo.getType();
                    var args = typeInfo.getArgument();
                    if (args) {
                        var inputType = (0, graphql_1.getNamedType)(args.type);
                        var newNode = {
                            type: inputType || undefined,
                            isList: _this.isList(type),
                            parent: currentNode,
                            fragmentRefs: [],
                            children: {},
                        };
                        currentNode.children[args.name] = newNode;
                        if ((0, graphql_1.isInputObjectType)(inputType)) {
                            if ((0, graphql_1.isInputObjectType)(inputType)) {
                                newNode.children = _this.getChildrenTreeNodes(inputType, newNode);
                            }
                        }
                        currentNode = newNode;
                    }
                }
            },
            leave: function (node) {
                if (node.kind === 'Argument') {
                    if (!_this.isTypeTree(currentNode.parent)) {
                        currentNode = currentNode.parent;
                    }
                }
            },
        };
        (0, graphql_1.visit)(definition, (0, graphql_1.visitWithTypeInfo)(typeInfo, visitor));
        this.inputCache.set(definition, typeTree);
        return typeTree;
    };
    GraphqlValueTransformer.prototype.getChildrenTreeNodes = function (inputType, parent, depth) {
        var _this = this;
        if (depth === void 0) { depth = 0; }
        if (depth > 3)
            return {};
        return Object.entries(inputType.getFields()).reduce(function (result, _a) {
            var _b;
            var key = _a[0], field = _a[1];
            var namedType = (0, graphql_1.getNamedType)(field.type);
            if (namedType === parent.type) {
                // Allow _and/_or self-references in filter types, but limit depth to prevent infinite loops
                if (key === '_and' || key === '_or') {
                    var selfRefChild = {
                        type: namedType,
                        isList: _this.isList(field.type),
                        parent: parent,
                        fragmentRefs: [],
                        children: {},
                    };
                    if ((0, graphql_1.isInputObjectType)(namedType)) {
                        selfRefChild.children = _this.getChildrenTreeNodes(namedType, selfRefChild, depth + 1);
                    }
                    result[key] = selfRefChild;
                    return result;
                }
                return result;
            }
            var child = {
                type: namedType,
                isList: _this.isList(field.type),
                parent: parent,
                fragmentRefs: [],
                children: {},
            };
            if ((0, graphql_1.isInputObjectType)(namedType)) {
                child.children = _this.getChildrenTreeNodes(namedType, child);
            }
            return __assign(__assign({}, result), (_b = {}, _b[key] = child, _b));
        }, {});
    };
    GraphqlValueTransformer.prototype.isList = function (t) {
        return (0, graphql_1.isListType)(t) || ((0, graphql_1.isNonNullType)(t) && (0, graphql_1.isListType)(t.ofType));
    };
    GraphqlValueTransformer.prototype.deepMergeChildren = function (target, source) {
        var merged = __assign({}, target);
        var _loop_1 = function (key) {
            if (source.hasOwnProperty(key)) {
                if (merged[key]) {
                    // If the key already exists, merge recursively
                    if (source[key].children && Object.keys(source[key].children).length > 0) {
                        merged[key].children = this_1.deepMergeChildren(merged[key].children, source[key].children);
                    }
                    // Merge fragmentRefs from both nodes, avoiding duplicates
                    if (source[key].fragmentRefs && source[key].fragmentRefs.length > 0) {
                        var existingRefs_1 = new Set(merged[key].fragmentRefs);
                        var newRefs = source[key].fragmentRefs.filter(function (ref) { return !existingRefs_1.has(ref); });
                        if (newRefs.length > 0) {
                            merged[key].fragmentRefs = __spreadArray(__spreadArray([], merged[key].fragmentRefs, true), newRefs, true);
                        }
                    }
                }
                else {
                    merged[key] = source[key];
                }
            }
        };
        var this_1 = this;
        for (var key in source) {
            _loop_1(key);
        }
        return merged;
    };
    GraphqlValueTransformer.prototype.getTypeNodeByPath = function (typeTree, path) {
        var targetNode = typeTree.operation;
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var segment = path_1[_i];
            if (Number.isNaN(Number.parseInt(segment, 10))) {
                if (targetNode) {
                    var children = targetNode.children;
                    if (targetNode.fragmentRefs.length) {
                        var fragmentRefs = targetNode.fragmentRefs.slice();
                        while (fragmentRefs.length) {
                            var ref = fragmentRefs.pop();
                            if (ref) {
                                var fragment = typeTree.fragments[ref];
                                if (fragment) {
                                    // Deeply merge the children
                                    children = this.deepMergeChildren(children, fragment.children);
                                    if (fragment.fragmentRefs) {
                                        fragmentRefs.push.apply(fragmentRefs, fragment.fragmentRefs);
                                    }
                                }
                            }
                        }
                    }
                    targetNode = children[segment];
                }
            }
        }
        return targetNode;
    };
    GraphqlValueTransformer.prototype.traverse = function (o, visitorFn, path) {
        if (path === void 0) { path = []; }
        for (var _i = 0, _a = Object.keys(o); _i < _a.length; _i++) {
            var key = _a[_i];
            path.push(key);
            o[key] = visitorFn(key, o[key], path);
            if (o[key] !== null && typeof o[key] === 'object') {
                this.traverse(o[key], visitorFn, path);
            }
            path.pop();
        }
    };
    GraphqlValueTransformer.prototype.isTypeTree = function (input) {
        return input.hasOwnProperty('fragments');
    };
    return GraphqlValueTransformer;
}());
exports.GraphqlValueTransformer = GraphqlValueTransformer;
