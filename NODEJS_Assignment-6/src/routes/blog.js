const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here

//Getting All Blogs
router.get('/allblog',async (req,res)=>{
    try {
        const allData = await Blog.find();
        res.json(allData);
    }
    catch(error) {
        console.log(error.message);
    }
})


//Getting Blogs by Params
router.get('/blog', async (req, res, next) => {
    try{
        let page = req.query.page;
        let topic = req.query.search;
        if(topic == null) {
            return res.json({
                status: "Failed to Fetch",
                message: "Missing value for 'search' Param."
            })
        }
        else {
            const BlogsforTopic = await Blog.find({topic: topic});
            if(page == null || page <=0) {
                return res.json({
                    status: "Failed to Fetch",
                    message: "Please give Page greater than 0"
                })
            }
            else if(BlogsforTopic.length === 0) {
                return res.json({
                    status: "Failed to Fetch",
                    message: "There were no blogs with the topic '" + topic + "'."
                })
            }
            else if(page > Math.ceil(BlogsforTopic.length/5)) {
                return res.json({
                    status: "Failed to Fetch",
                    message: "There were only " + BlogsforTopic.length + " Blogs with topic '" + topic + "'. As limit is 5 blogs per Page, Please enter page less than " + (Math.ceil(BlogsforTopic.length/5) + 1)
                })
            }
            else {
                const skip = (page-1) * 5;
                const filteredBlogs = await Blog.find({topic: topic}).limit(5).skip(skip);
                return res.json({
                    status: "Success",
                    Page_Details: {
                        page_number: page,
                        limit: 5,
                        showing_blogs: filteredBlogs.length
                    },
                    result : filteredBlogs
                })
            }
        }
    }
    catch(error) {
        res.json({
            status: "Failed",
            message : error.message
        })
    }
})



//Adding Blog to the DB
router.post('/blog', async (req, res) => {
    const blogData = req.body;
    try{
        const newBlog = new Blog(blogData);
        await newBlog.save();
        return res.json({
            status: "Success",
            result: newBlog
        });
    }
    catch(error) {
        return res.send({
            status: "Failed to Add Blog",
            message: error.message
        });
    }
})



//Updating the existing Blog
router.put('/blog/:id', async (req, res) => {
    try {
        const blogToUpdate = await Blog.findById(req.params.id);
        if(blogToUpdate == null) {
            return res.json({
                status: "Failed to Update",
                message: "Couldn't find the Blog with the id " + req.params.id
            })
        }
        const updates = req.body;
        await Blog.findByIdAndUpdate(req.params.id, updates);
        const updatedBlog = await Blog.findById(req.params.id);
        return res.json({
            status: "Success",
            result: updatedBlog
        });
    }
    catch(error) {
        return res.send({
            status: "Failed to Update",
            message: error.message
        });
    }
})


//Deleting the existing Blog
router.delete('/blog/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findById(req.params.id);
        if(deletedBlog == null) {
            return res.json({
                status: "Failed to Delete",
                message: "Couldn't find the Blog with id " + req.params.id
            })
        }
        await Blog.findByIdAndDelete(req.params.id);
        return res.json({
            status: "Success",
            result: deletedBlog
        });
    }
    catch(error) {
        return res.send({
            status: "Failed to Delete",
            message: error.message
        });
    }
})


module.exports = router;