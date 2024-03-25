const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

Category.countDistinctItem = async function (categoryName) {
  try {
    const count = await this.model("Item").countDocuments({
      category: categoryName,
    });
    return count;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = Category;
