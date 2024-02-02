
import fastify,{ 
  FastifyInstance, 
  FastifyPluginOptions, 
  FastifyPluginAsync 
} from 'fastify';
import { Prisma,PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { RedwoodError } from '@redwoodjs/api'
const Port = process.env.PORT || 3000;
const routes = require("./routes/blog");

const prisma = new PrismaClient();
const app = fastify({
  logger: true
});

app.listen({ port: 3000 })
  .then((address:string) => console.log(`server listening on ${address}`))
  .catch(err => {
    console.log('Error starting server:', err)
    process.exit(1)
  })

  routes.forEach((route:any, index:any) => {
    app.route(route)
})
