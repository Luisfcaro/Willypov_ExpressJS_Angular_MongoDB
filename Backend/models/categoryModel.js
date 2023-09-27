const mongoose = require('mongoose');
const slugify = require('slugify');
const uniqueValidator = require('mongoose-unique-validator');

const category_schema = mongoose.Schema({
    slug: { 
        type: String, 
        lowercase: true, 
        unique: true 
    },
    id_cat: {
        type: String,
        required: true
    },
    category_name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

category_schema.plugin(uniqueValidator);

category_schema.pre('save', function(next){
    this.slug = slugify(this.category_name, { lower: true, replacement: '-'});
    next();
});



category_schema.methods.toCategoryResponse = async function () {
    return {
        slug: this.slug,
        id_cat: this.id_cat,
        category_name: this.category_name,
        image: this.image,
        products: this.products,
    }
}


module.exports = mongoose.model('Category', category_schema);