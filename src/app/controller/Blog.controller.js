const BlogCollection = require("../models/blog.schema");
const {ObjectId} = require("mongodb");


const blog_create_controller = async (req, res) => {

    try {
        const data  = req.body;

        let blogImg
        if(req?.files){
            const imgdata = req.files.blogImg.data;
            const encodedpic = imgdata.toString('base64');
            blogImg = Buffer.from(encodedpic, 'base64');
        }
    
        const blog = {...data, blogImg};
      
        const blog_created = new BlogCollection(blog)
        await blog_created.save()
    
        res.json({msg: 'saved success'})
    } catch (error) {
        res.status(400).json({error});
        
    }
};


const getBlogsController = async (req, res) => {
    const products = await BlogCollection.find({}).populate('writtenBy');
    res.send(products);
  };

  const getSingleBlogController = async (req, res) => {
    console.log('params ', req.params.id)
    const objectIdQuery = new ObjectId(req.params.id);

    const blog = await BlogCollection.findOne({_id: objectIdQuery }).populate('writtenBy');
    res.send(blog);
  };

module.exports = {
    blog_create_controller,
    getBlogsController,
    getSingleBlogController
  };