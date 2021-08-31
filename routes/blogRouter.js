const { Router } = require('express');
const { getAllBlogs, addBlog, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const { upload } = require('../middleware/multerUpload');
const { cloudinaryConfig } = require('../utils/cloudinaryConfig');

const router = Router();

if(process.env.IMAGE_SAVE_MODE == 'cloudinary'){
    router.use('*', cloudinaryConfig);
}

router.route('/').get(getAllBlogs).post(upload, addBlog);
router.route('/:blogId').get(getBlogById).post(upload, updateBlog).delete(deleteBlog);

module.exports = router;

