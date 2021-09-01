const fs = require('fs');
const cloudinary = require('cloudinary');
const uniqid = require('uniqid');
const blog = require("../models/blogSchema");
const { dataUri } = require('../middleware/multerUpload');
const { uploader } = require('../utils/cloudinaryConfig');
const { sendResponse } = require('../utils/HandleResponse');
const { GlobalErrorhandling } = require('../middleware/globalError');

let resData;

const getAllBlogs = async (req, res, next) => {
    try{
        resData = await blog.find();
        return sendResponse({
            res,
            statusCode: 200,
            message: "Fetched All Blog Data",
            data: resData,
        });
    }catch(error){
        return next(new GlobalErrorhandling({
            message: 'An Error Occurred while fetching all Blogs',
            error: error,
        }).internalServerError());
    }
}

const getBlogById = async (req, res, next) => {
    try{
        const { blogId } = req.params;

        resData = await blog.findOne({ blogId });
    
        if(!resData){
            return next(new GlobalErrorhandling({
                message: 'Blog with ID Not Found',
                error: 'Invalid Request',
            }).notFoundError());
        }
        return sendResponse({
            res,
            statusCode: 200,
            message: "Fetched Blog with the ID",
            data: resData,
        });
    }catch(error){
        return next(new GlobalErrorhandling({
            message: 'An Error Occurred while fetching Blog with ID',
            error: error,
        }).internalServerError());
    }   
}

const getRandomBlog = async (req, res, next) => {
    try{
        resData = await blog.find();
        resData = resData[Math.floor(Math.random()*resData.length)];
    
        if(!resData){
            return next(new GlobalErrorhandling({
                message: 'No Blogs Present',
                error: 'No Resource Found',
            }).notFoundError());
        }
        return sendResponse({
            res,
            statusCode: 200,
            message: "Fetched a Random Blog",
            data: resData,
        });

    }catch(error){
        return next(new GlobalErrorhandling({
            message: 'An Error Occurred while fetching a random Blog',
            error: error,
        }).internalServerError());
    } 
}

const addBlog = async (req, res, next) => {
    let public_id = "";
    let imagePath = "";
    if(process.env.IMAGE_SAVE_MODE == 'cloudinary'){
        try{
            if(req.file){
                const file = dataUri(req).content;
                result = await uploader.upload(file);
                public_id = await result.public_id,
                imagePath = result.url;
            }
        }catch(error){
            return next(new GlobalErrorhandling({
                message: 'An Error Occurred while saving image',
                error: error,
            }).internalServerError());
        }
    }
    else{
        if(req.file){
            imagePath = req.file.filename;
        }
    }

    const { author, createdAt, updatedAt, blogTitle, blogContent, relatedLinks, tags } = req.body;

    linkArray = [];

    if(relatedLinks){
        relLinks = JSON.parse(relatedLinks);
        if(relLinks.length){
            relLinks.forEach((link)=>{
                let obj = {};
                obj.title = link.title;
                obj.href = link.href;
                linkArray.push(obj);
            });    
        }
    }

    try{
        resData = await blog.find({ tags: [tags] });
        if (resData.length){
            resData.forEach((item) => {
                let obj = {};
                obj.title = item.blogTitle;
                obj.href = "www.none.com";
                obj.refId = item.blogId;
                linkArray.push(obj);
            });
        }

        let newBlog = new blog({
            blogId: uniqid(),
            author,
            createdAt,
            updatedAt,
            blogTitle,
            blogContent,
            blogImage: imagePath,
            blogImageId: public_id,
            tags,
            relatedLinks: linkArray,
        });

        newBlog = await newBlog.save();

        return sendResponse({
            res,
            statusCode: 200,
            message: 'Successfully Added a new Blog',
            data: newBlog,
        });
    }catch(error){
        return next(new GlobalErrorhandling({
            message: 'An Error Occurred while creating a new Blog',
            error: error,
        }).badRequest());
    }
}

const isUrl = (s) => {
    let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
 }

const updateBlog = async (req, res, next) => {
    try{
        if(req.body.blogId || req.body.createdAt){
            return next(new GlobalErrorhandling({
                message: 'Some Parameters in Query are not accepted',
                error: 'Invalid Request',
            }).badRequest());
        }

        const validUpdate = ['author', 'updatedAt', 'blogTitle', 'blogContent', 'blogImage','relatedLinks', 'tags']; 

        if(!req.body.updatedAt){
            return next(new GlobalErrorhandling({
                message: 'UpdateAt is required in Query during Update Operation',
                error: 'Invalid Request',
            }).badRequest());
        }

        reqBody = req.body;
        count = 0;
        Object.keys(reqBody).forEach((item) => {
            if(!validUpdate.includes(item)){
                count+=1;
            }
        });
        if(count>0){
            return next(new GlobalErrorhandling({
                message: 'Additional Parameters in Query',
                error: 'Invalid Request',
            }).badRequest());
        }

        const { blogId } = req.params;

        resData = await blog.findOne({ blogId });

        if(!resData){
            return next(new GlobalErrorhandling({
                message: 'Blog with Id not Found',
                error: 'Invalid Request',
            }).notFoundError());
        }

        if(!isUrl(resData.blogImage)){
            image_saved_mode = 'local';
        }
        else{
            image_saved_mode = 'cloudinary' 
        }

        if(process.env.IMAGE_SAVE_MODE == 'cloudinary' && req.file){

            if(image_saved_mode == 'local'){
                return next(new GlobalErrorhandling({
                    message: 'Previous Image was saved in Local mode and cannot be updated in Cloudinary mode',
                    error: 'Some Problem Occurred',
                }).badRequest());
            }

            try{
                if(resData.blogImageId){
                    cloudinary.v2.uploader.destroy(resData.blogImageId, function(error,result) {
                    });
                }
                
                const file = dataUri(req).content;
                result = await uploader.upload(file);
                reqBody.blogImageId = await result.public_id,
                reqBody.blogImage = result.url;
            }catch(error){
                return next(new GlobalErrorhandling({
                    message: 'An Error Occurred while saving image',
                    error: error,
                }).internalServerError());
            }
        }

        if(process.env.IMAGE_SAVE_MODE == 'local' && req.file){

            if(image_saved_mode == 'cloudinary'){
                return next(new GlobalErrorhandling({
                    message: 'Previous Image was saved in Cloudinary mode and cannot be updated in Local mode',
                    error: "Some Problem Occurred",
                }).badRequest());
            }

            if(resData.blogImage){
                path = './uploads/' + resData.blogImage;

                fs.unlink(path, (error) => {
                    if(error){
                        return next(new GlobalErrorhandling({
                            message: 'Image cannot be updated',
                            error: error,
                        }).internalServerError());
                    }
                });
            }
            reqBody.blogImage = req.file.filename;
        }
     
        resData = await blog.findOneAndUpdate({ blogId }, reqBody, {runValidators: true, new: true});

        return sendResponse({
            res,
            statusCode: 200,
            message: 'Successfully Updated Blog',
            data: resData,
        });

    }catch(error){
        return next(new GlobalErrorhandling({
            message: 'An Error Occurred while Updating Blog',
            error: error,
        }).badRequest());
    } 
}

const deleteBlog = async (req, res, next) => {
    const { blogId } = req.params;
    try{
        resData = await blog.findOneAndDelete({ blogId });

        if(!resData){
            return next(new GlobalErrorhandling({
                message: 'Blog with Id not found',
                error: "Invalid Request",
            }).notFoundError());
        }

        if(!isUrl(resData.blogImage)){
            image_saved_mode = 'local';
        }
        else{
            image_saved_mode = 'cloudinary' 
        }
        
        if(process.env.IMAGE_SAVE_MODE == 'cloudinary' && resData.blogImage != ''){
        
            if(image_saved_mode == 'local'){
                return next(new GlobalErrorhandling({
                    message: 'Previous Image was saved in Local mode and cannot be deleted in Cloudinary mode',
                    error: 'Some Problem Occurred',
                }).badRequest());
            }
        
            if(resData.blogImageId){
                cloudinary.v2.uploader.destroy(resData.blogImageId, function(error,result) {
                });
            }  
        }
        
        if(process.env.IMAGE_SAVE_MODE == 'local' && resData.blogImage != ''){
        
            if(image_saved_mode == 'cloudinary'){
                return next(new GlobalErrorhandling({
                    message: 'Previous Image was saved in Cloudinary mode and cannot be deleted in Local mode',
                    error: "Some Problem Occurred",
                }).badRequest());
            }
        
            if(resData.blogImage){
                path = './uploads/' + resData.blogImage;
        
                fs.unlink(path, (error) => {
                    if(error){
                        return next(new GlobalErrorhandling({
                            message: 'Image cannot be deleted',
                            error: error,
                        }).internalServerError());
                    }
                });
            }
        }

        return sendResponse({
            res,
            statusCode: 204,
            message: 'Successfully Deleted Blog',
            data: resData,
        });
    }catch(error){
        return next(new GlobalErrorhandling({
            message: 'An Error Occurred while Deleting Blog',
            error: error,
        }).internalServerError());
    }
}

module.exports = {
    getAllBlogs,
    getBlogById,
    getRandomBlog,
    addBlog,
    updateBlog,
    deleteBlog,
}

// In delete also delete the images
// 

