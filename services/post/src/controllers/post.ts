import {Request, Response} from 'express'
import { PostServices } from "../services/post"

export  const PostControllers = {

    async createPost(req:Request, res:Response){
      const userId = req.headers['user-id'];
      const {tags, caption} = req.body;
       try {
        const post = await PostServices.createPost({tags, caption, userId:+userId, content:req.file.filename, createdAt: new Date()})
        res.status(201).send({success:true, post})
       } catch (error) {
        res.status(501).send({success:false, message:error.message})
       }
    },

    async getPosts(req:Request, res:Response){
        try {
         const posts = await PostServices.fetchPosts()
         res.status(200).send({success:true, posts})
        } catch (error) {
         res.status(501).send({success:false, message:error.message})
        }
     },

     async updatePost(req:Request, res:Response){
      const {id} = req.params;
      try {
       const posts = await PostServices.updatePost(+id ,req.body)
       res.status(200).send({success:true, posts})
      } catch (error) {
       res.status(501).send({success:false, message:error.message})
      }
   },

     async deletePost(req:Request, res:Response){
      const {id} = req.params;
      try {
       await PostServices.deletePost(+id)
       res.status(200).send({success:true, message:"post deleted"})
      } catch (error) {
       res.status(501).send({success:false, message:error.message})
      }
   },

     async toggleLikes(req:Request, res:Response){
        const userId = req.headers['user-id'];
        const {id} = req.params;
        const {reaction} = req.query;
        try {
         const result = await PostServices.likePostToggle({userId:+userId, postId:+id, reaction})
         res.status(200).send({success:true, result})
        } catch (error) {
         res.status(501).send({success:false, message:error.message})
        }
     },

     async addComment(req:Request, res:Response){
      const userId = req.headers['user-id'];
      const {id} = req.params;
      const {comment} = req.body;
       try {
        await PostServices.createComment({userId:+userId, postId:+id, comment})
        res.status(201).send({success:true, message:"comments added"})
       } catch (error) {
        res.status(501).send({success:false, message:error.message})
       }
    },

    async removeComment(req:Request, res:Response){
      const {id} = req.params;
       try {
        await PostServices.deleteComment(+id)
        res.status(201).send({success:true, message:"comments deleted"})
       } catch (error) {
        res.status(501).send({success:false, message:error.message})
       }
    },
}