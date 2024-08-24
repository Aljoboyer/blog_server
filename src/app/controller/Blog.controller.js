const BlogCollection = require("../models/blog.schema");


const blog_create_controller = async (req, res) => {
    console.log('post blog hitted --->', req.body)
    
    const data  = req.body;
    const imgdata = req.files.blogImg.data;

    const encodedpic = imgdata.toString('base64');
    const blogImg = Buffer.from(encodedpic, 'base64');

    const blog = {...data, blogImg};

    const blog_created = await BlogCollection.create(blog)
  
    // await postData.save()

    res.json({msg: 'saved success'})
};


module.exports = {
    blog_create_controller
  };