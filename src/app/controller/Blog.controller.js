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
    const blogs = await BlogCollection.find({}).populate('writtenBy');
    res.send(blogs);
  };

  const getSingleBlogController = async (req, res) => {
    const objectIdQuery = new ObjectId(req.params.id);

    const blog = await BlogCollection.findOne({_id: objectIdQuery }).populate('writtenBy');
    res.send(blog);
  };

  const getPersonalBlogsController = async (req, res) => {

    const objectIdQuery = new ObjectId(req.params.id);

    const blogs = await BlogCollection.find({writtenBy: objectIdQuery }).populate('writtenBy');
    res.send(blogs);
  };

  
const updateBlogController = async (req, res) => {

  try {
      const {title, description}  = req.body;
      const query = {_id: new ObjectId(req.body.editId)};

      if(req?.files){
          const imgdata = req.files.blogImg.data;
          const encodedpic = imgdata.toString('base64');
          const blogImg = Buffer.from(encodedpic, 'base64');

          const updateBlog = await BlogCollection.findOneAndUpdate(query, {
            $set: {
            title: title,
            description: description,
            blogImg: blogImg
             },
          });
      }
      else{
        const updateBlog = await BlogCollection.findOneAndUpdate(query, {
          $set: {
          title: title,
          description: description,
           },
        });
      }

      res.json({msg: 'update success'})
  } catch (error) {
      res.status(400).json({error});
      
  }
};

module.exports = {
    blog_create_controller,
    getBlogsController,
    getSingleBlogController,
    getPersonalBlogsController,
    updateBlogController
  };