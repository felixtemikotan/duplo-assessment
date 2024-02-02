const blogController = require('../controllers/blog');
const routes = [{
        method: 'GET',
        url: '/api/get-all-blog-posts',
        handler: blogController.getAllPosts
    },
    {
        method: 'GET',
        url: '/api/get-single-blog-post/:id',
        handler: blogController.getSinglePost
    },
    {
        method: 'POST',
        url: '/api/add-blog-post',
        handler: blogController.addNewPost,
    },
    {
        method: 'PUT',
        url: '/api/update-blog-post/:id',
        handler: blogController.updatePost
    },
    {
        method: 'DELETE',
        url: '/api/delete-blog-post/:id',
        handler: blogController.deletePost
    }
]
module.exports = routes