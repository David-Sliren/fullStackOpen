const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((res) => console.log("Conect to MongoDB"))
  .catch((error) => console.log("error in the conection to MongoDB: ", error));

const phonebookSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: [3, "you must enter at least 3 characters"],
  },
  number: {
    type: String,
    minLength: [8, "you must enter at least 8 characters"],
    validate: {
      validator: (v) => /^\d{1,3}-\d+$/.test(v),
      message: (props) => `${props.value} is not on valide number`,
    },
  },
});

phonebookSchema.set("toJSON", {
  transform: (doc, ret) => {
    // Primer parametro es el documento original el segundo es el que modificamos para enviarselo a el usuario
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("PhoneBook", phonebookSchema);
