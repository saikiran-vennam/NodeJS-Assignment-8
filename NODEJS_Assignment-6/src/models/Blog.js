const { date } = require('joi');
const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic : {
        type : String,
        required: true,
    },
    description : {
        type : String
    },
    posted_at: {
        type: String
    },
    posted_by : {
        type : String
    }
})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;