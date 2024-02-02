
import fastify from 'fastify';
import { Prisma,PrismaClient } from '@prisma/client';
import 'dotenv/config';
import {addPostValidator, updatePostValidator, paramsValidator, options} from '../util/utils'

const prisma = new PrismaClient();
const app = fastify();

exports.addNewPost = async (req: { body: any; }, reply: any) => {
    try {
        const {error} = addPostValidator.validate(req.body,options)
        if(error){
            console.log(error.details[0].message);
            return {
                status:400,
                message:error.details[0].message
            }
        }
    const newpost = await prisma.blogPost.create({
        data: req.body
    })
    const allBlogPost = await prisma.blogPost.findMany({
        orderBy: [
          {
            dateUpdated: 'desc'
          }
        ]
        })
        return reply.code(201).send({status:201, message: "Blog post added successfully", data:allBlogPost});
    } catch(e:any){
        const response =  e instanceof Prisma.PrismaClientKnownRequestError  && e.code === 'P2002' ? { status: 400, message: "Blog title already exist", column: e?.meta?.target, error: "duplicate exist" } : { status: 500, error:e?.message}
        reply.code(200).send(response)
    }
    }

exports.getAllPosts = async (req: any, reply: any) => {     
    try{
        const allBlogPost = await prisma.blogPost.findMany({
            orderBy: [
              {
                dateUpdated: 'desc'
              }
            ]
            })
        return reply.code(200).send({status:200, message: "All blog post retrieved successfully", data:allBlogPost});
    }catch(e:any){
        const response =  e instanceof Prisma.PrismaClientKnownRequestError  && e.code === 'P2002' ? { status: 400, message: "Blog title already exist", column: e?.meta?.target, error: "duplicate exist" } : { status: 500, error:e?.message}
        reply.code(200).send(response)
    }
}

exports.getSinglePost = async (req: { params: { id: any; }; }, reply: any) => {
    try {
    const id = req.params.id
    const {error} = paramsValidator.validate({id:id},options)
    if(error){
        console.log(error.details[0].message);
        return {
            status:400,
            message:error.details[0].message
        }
    }
    let post = await  await prisma.blogPost.findUnique({
        where: {
            id: String(id)
        }
    })
    return reply.code(200).send({status:200, message: post == null ? "Invalid Id": "Blog post retrieved successfully", data:post});
    }catch(e:any){
        const response =  e instanceof Prisma.PrismaClientKnownRequestError  && e.code === 'P2002' ? { status: 400, message: "Blog title already exist", column: e?.meta?.target, error: "duplicate exist" } : { status: 500, error:e?.message}
        reply.code(200).send(response)
    }
}

exports.updatePost = async (req: { params: { id: any; }; body: any; }, reply: any) => {
    try {
    const id = req.params.id
    const {error} = updatePostValidator.validate({...req.body,id:req.params?.id},options)
    if(error){
        console.log(error.details[0].message);
        return {
            status:400,
            message:error.details[0].message
        }
    }
    let result = await prisma.blogPost.update({
        where: {
            id: String(id)
        },
        data: req.body
    })
    const allBlogPost = await prisma.blogPost.findMany({
        orderBy: [
          {
            dateUpdated: 'desc'
          }
        ]
        })
        return reply.code(200).send({status:200, message: "Blog post updated successfully", data:allBlogPost});
    } catch(e:any){
        console.log(e.code)
        const response =  e instanceof Prisma.PrismaClientKnownRequestError  && e.code === 'P2025' ? { status: 400, message: "Either this blogpost has been deleted or it does not exist", column: e?.meta?.target, error: "Not found error" } : { status: 500, error:e?.message}
        reply.code(200).send(response)
      }
}

exports.deletePost = async (req: { params: { id: any; }; }, reply: any) => {
    try {
        const id = req.params.id
        const {error} = paramsValidator.validate({id:id},options)
        if(error){
            console.log(error.details[0].message);
            return {
                status:400,
                message:error.details[0].message
            }
        }
   
    await prisma.blogPost.delete({
        where: {
            id: String(id)
        }
    })
    const allBlogPost = await prisma.blogPost.findMany({
        orderBy: [
          {
            dateUpdated: 'desc'
          }
        ]
        })
        return reply.code(202).send({status:202, message: "blog post deleted successfully", data:allBlogPost});
    } catch(e:any){
        console.log(e.code)
        const response =  e instanceof Prisma.PrismaClientKnownRequestError  && e.code === 'P2025' ? { status: 400, message: "Either this blogpost has been deleted or it does not exist", column: e?.meta?.target, error: "Not found error" } : { status: 500, error:e?.message}
        reply.code(200).send(response)
      }
}