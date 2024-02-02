
import fastify from 'fastify';
import { Prisma,PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { RedwoodError } from '@redwoodjs/api';
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
    const newpost = await prisma.BlogPost.create({
        data: req.body
    })
    return reply.code(200).send({status:201, message: "Post added successfully", data: newpost})
    } catch(e:any){
        const response =  e instanceof Prisma.PrismaClientKnownRequestError  && e.code === 'P2002' ? { status: 400, message: "Blog title already exist", column: e?.meta?.target, error: "duplicate exist" } : { status: 500, error:e?.message}
        reply.code(200).send(response)
    }
    }

exports.getAllPosts = async (req: any, reply: any) => {     
    try{
        const allBlogPost = await prisma.BlogPost.findMany()
        return reply.code(200).send({status:200, data:allBlogPost});
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
    let post = await  await prisma.BlogPost.findUnique({
        where: {
            id: String(id)
        }
    })
    return reply.code(200).send({status:200, message: "post retrieved successfully", data:post});
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
    let result = await prisma.BlogPost.update({
        where: {
            id: String(id)
        },
        data: req.body
    })
    return reply.code(201).send({status:201, message: "post updated successfully", data:result});
    } catch(e:any){
        const response =  e instanceof Prisma.PrismaClientKnownRequestError  && e.code === 'P2002' ? { status: 400, message: "Blog title already exist", column: e?.meta?.target, error: "duplicate exist" } : { status: 500, error:e?.message}
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
   
    await prisma.BlogPost.delete({
        where: {
            id: String(id)
        }
    })
    const allBlogPost = await prisma.BlogPost.findMany()
        return reply.code(200).send({status:200, data:allBlogPost});
    } catch(e:any){
        const response =  e instanceof Prisma.PrismaClientKnownRequestError  && e.code === 'P2002' ? { status: 400, message: "Blog title already exist", column: e?.meta?.target, error: "duplicate exist" } : { status: 500, error:e?.message}
        reply.code(200).send(response)
      }
}