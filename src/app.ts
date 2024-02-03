
import fastify from 'fastify';
import { Prisma,PrismaClient } from '@prisma/client';
import 'dotenv/config';
const Port = process.env.PORT || 8080;
const routes = require("./routes/blog");

const prisma = new PrismaClient();
const app = fastify({
  logger: true
});

app.listen({ port: 8080 })
  .then((address:string) => console.log(`server listening on ${address}`))
  .catch(err => {
    console.log('Error starting server:', err)
    process.exit(1)
  })

  routes.forEach((route:any, index:any) => {
    app.route(route)
})


