
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


// const main = async () => {     
//   try{
//       const createBlogPost = await prisma.BlogPost.create({
//       data: {
//           title: 'Other ORMS II',
//           content: 'Other ORMS',
//           author: "Felix Temikotan",
//       },
//       })
//       console.log("createBlogPost",createBlogPost)
//       const allBlogPost = await prisma.BlogPost.findMany()
//       return allBlogPost
//   }catch(e:any){
//       return e instanceof Prisma.PrismaClientKnownRequestError  && e.code === 'P2002' ? { status: 400, message: "Blog title already exist", column: e?.meta?.target, error: "duplicate exist" } : { status: 500, error:e?.message}
//   }
// }

// main().then((data:any)=>console.log(data)).catch((err:any)=>console.log(err))