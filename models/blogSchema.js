const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    blogId: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: [true, 'An author for the blog is required'],
    },
    createdAt: {
        type: String,
        required: [true, 'The Time and Date of creation is required'],
        validate: {
            validator: function(v){
                return /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])\s(3[01]|[12][0-9]|0[1-9])\/(1[0-2]|0[1-9])\/[0-9]{4}/.test(v);
            },
            message: (props) => `Enter the correct format 'HH:MM:SS DD/MM/YYYY' for ${props.value}`,
        },
    },
    updatedAt: {
        type: String,
        default: "",
        validate: {
            validator: function(v){
                if(v != ''){
                    return /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])\s(3[01]|[12][0-9]|0[1-9])\/(1[0-2]|0[1-9])\/[0-9]{4}/.test(v);
                }
            },
            message: (props) => `Enter the correct format 'HH:MM:SS DD/MM/YYYY' for ${props.value}`,
        },
    },
    blogTitle: {
        type: String,
        required: [true, "A title for Blog is required"],
    },
    blogContent: {
        type: String,
        required: [true, "Content for Blog is required"],
        minlength: [30, "Blog content should have more content"],
    },
    blogImage: {
        type: String,
        default: "",
    },
    blogImageId: {
        type: String,
        default: "",
    },
    tags: {
        type: [String],
        default: [],
    },
    relatedLinks: {
        type: [{
            title: {
                type: String,
                required: [true, "A title for Related Link is required"],
            },
            href: {
                type: String,
                required: [true, "A link to the reference blog is required"],
                validate: {
                    validator: function(v){
                        return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(v);
                    },
                    message: (props) => 'Please Enter a valid Reference Link',
                }
            },
            refId: {
                type: String,
                default: "",
            },
        }],
        default: [],
    }
});

const blog = mongoose.model('blogs', blogSchema);

module.exports = blog;
