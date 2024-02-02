"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.paramsValidator = exports.updatePostValidator = exports.updatePostValidator1 = exports.addPostValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addPostValidator = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    author: joi_1.default.string().required()
});
exports.updatePostValidator1 = joi_1.default.object({
    id: joi_1.default.string().required(),
    title: joi_1.default.string().optional().allow('', ' ', null),
    content: joi_1.default.string().optional().allow('', ' ', null),
    author: joi_1.default.string().optional().allow('', ' ', null),
});
exports.updatePostValidator = joi_1.default.object({
    id: joi_1.default.string().required(),
    title: joi_1.default.string().allow(null, ''),
    content: joi_1.default.string().allow(null, ''),
    author: joi_1.default.string().allow(null, ''),
}).or('title', 'content', 'author');
exports.paramsValidator = joi_1.default.object({
    id: joi_1.default.string().required(),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
