"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
require("dotenv/config");
const utils_1 = require("../util/utils");
const prisma = new client_1.PrismaClient();
const app = (0, fastify_1.default)();
exports.addNewPost = async (req, reply) => {
    try {
        const { error } = utils_1.addPostValidator.validate(req.body, utils_1.options);
        if (error) {
            console.log(error.details[0].message);
            return {
                status: 400,
                message: error.details[0].message
            };
        }
        const newpost = await prisma.blogPost.create({
            data: req.body
        });
        const allBlogPost = await prisma.blogPost.findMany({
            orderBy: [
                {
                    dateUpdated: 'desc'
                }
            ]
        });
        return reply.code(201).send({ status: 201, message: "Blog post added successfully", data: allBlogPost });
    }
    catch (e) {
        const response = e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2002' ? { status: 400, message: "Blog title already exist", column: e?.meta?.target, error: "duplicate exist" } : { status: 500, error: e?.message };
        reply.code(200).send(response);
    }
};
exports.getAllPosts = async (req, reply) => {
    try {
        const allBlogPost = await prisma.blogPost.findMany({
            orderBy: [
                {
                    dateUpdated: 'desc'
                }
            ]
        });
        return reply.code(200).send({ status: 200, message: "All blog post retrieved successfully", data: allBlogPost });
    }
    catch (e) {
        const response = e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2002' ? { status: 400, message: "Blog title already exist", column: e?.meta?.target, error: "duplicate exist" } : { status: 500, error: e?.message };
        reply.code(200).send(response);
    }
};
exports.getSinglePost = async (req, reply) => {
    try {
        const id = req.params.id;
        const { error } = utils_1.paramsValidator.validate({ id: id }, utils_1.options);
        if (error) {
            console.log(error.details[0].message);
            return {
                status: 400,
                message: error.details[0].message
            };
        }
        let post = await await prisma.blogPost.findUnique({
            where: {
                id: String(id)
            }
        });
        return reply.code(200).send({ status: 200, message: post == null ? "Invalid Id" : "Blog post retrieved successfully", data: post });
    }
    catch (e) {
        const response = e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2002' ? { status: 400, message: "Blog title already exist", column: e?.meta?.target, error: "duplicate exist" } : { status: 500, error: e?.message };
        reply.code(200).send(response);
    }
};
exports.updatePost = async (req, reply) => {
    try {
        const id = req.params.id;
        const { error } = utils_1.updatePostValidator.validate({ ...req.body, id: req.params?.id }, utils_1.options);
        if (error) {
            console.log(error.details[0].message);
            return {
                status: 400,
                message: error.details[0].message
            };
        }
        let result = await prisma.blogPost.update({
            where: {
                id: String(id)
            },
            data: req.body
        });
        const allBlogPost = await prisma.blogPost.findMany({
            orderBy: [
                {
                    dateUpdated: 'desc'
                }
            ]
        });
        return reply.code(200).send({ status: 200, message: "Blog post updated successfully", data: allBlogPost });
    }
    catch (e) {
        console.log(e.code);
        const response = e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2025' ? { status: 400, message: "Either this blogpost has been deleted or it does not exist", column: e?.meta?.target, error: "Not found error" } : { status: 500, error: e?.message };
        reply.code(200).send(response);
    }
};
exports.deletePost = async (req, reply) => {
    try {
        const id = req.params.id;
        const { error } = utils_1.paramsValidator.validate({ id: id }, utils_1.options);
        if (error) {
            console.log(error.details[0].message);
            return {
                status: 400,
                message: error.details[0].message
            };
        }
        await prisma.blogPost.delete({
            where: {
                id: String(id)
            }
        });
        const allBlogPost = await prisma.blogPost.findMany({
            orderBy: [
                {
                    dateUpdated: 'desc'
                }
            ]
        });
        return reply.code(202).send({ status: 202, message: "blog post deleted successfully", data: allBlogPost });
    }
    catch (e) {
        console.log(e.code);
        const response = e instanceof client_1.Prisma.PrismaClientKnownRequestError && e.code === 'P2025' ? { status: 400, message: "Either this blogpost has been deleted or it does not exist", column: e?.meta?.target, error: "Not found error" } : { status: 500, error: e?.message };
        reply.code(200).send(response);
    }
};
