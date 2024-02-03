"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
require("dotenv/config");
const Port = process.env.PORT || 3000;
const routes = require("./routes/blog");
const prisma = new client_1.PrismaClient();
const app = (0, fastify_1.default)({
    logger: true
});
app.listen({ port: 3000, host: '0.0.0.0' })
    .then((address) => console.log(`server listening on ${address}`))
    .catch(err => {
    console.log('Error starting server:', err);
    process.exit(1);
});
routes.forEach((route, index) => {
    app.route(route);
});
