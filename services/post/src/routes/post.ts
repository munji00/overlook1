import {Router} from 'express';
import { PostControllers } from '../controllers/post';
import { upload } from '../config/multer.config';

const postRoutes:Router = Router();
postRoutes.post('/create', upload.single('content'), PostControllers.createPost);
postRoutes.get('/fetch', PostControllers.getPosts);
postRoutes.put('/update/:id', PostControllers.updatePost);
postRoutes.put('/like/:id', PostControllers.toggleLikes);
postRoutes.post('/comments/add/:id', PostControllers.addComment);
postRoutes.delete('/comments/remove/:id', PostControllers.removeComment);
postRoutes.delete('/remove/:id', PostControllers.deletePost);

export default postRoutes;
