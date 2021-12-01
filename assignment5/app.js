const express = require("express")
const { findSourceMap } = require("module")
const { MongoServerSelectionError } = require("mongodb")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())

const connect = () => {
    return mongoose.connect(" mongodb://127.0.0.1:27017/booklib")
}


// creating shemas----------------------------------------

// 1.section schema

const sectionSchema = new mongoose.Schema({
    name: {type:String, required:true}
},{
    versionKey:false,
    timestamps:true
})

const Section = mongoose.model("section", sectionSchema)

//2.user schema

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true }
    },
    {
        versionKey: false,
        timestamps: true,
    }

);

const User = mongoose.model("user", userSchema);

// 3.author schema
const authorSchema = new mongoose.Schema({
   author: {type:String, required:true}
},{
    versionKey:false,
    timestamps:true
})

const Author = mongoose.model("author", authorSchema)



//3.book schema
const bookSchema = new mongoose.Schema({
   
    body:{type:String, required:true},

    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required:true
    },
    author_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "author",
        
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
          
    }
},{
    versionKey:false,
    timestamps:true
})

const Book = mongoose.model("book", bookSchema)
//4.checkout schema

const checkoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bookid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required:true,
    }]
},{
    versionKey:false,
    timestamps:true
})

const Checkout = mongoose.model("checkouts", checkoutSchema)

//crud operation on author
app.post("/author", async (req,res) => {
    try{
        const author = await Author.create(req.body)
        return res.status(201).send(author)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})

app.get("/author", async (req,res) => {
    try{
        const authors = await Author.find().lean().exec()
        return res.status(201).send(authors)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})
app.get("/author/:id", async (req,res) => {
    try{
        const authors = await Author.findById(req.params.id).lean().exec()
        return res.status(201).send(authors)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})

app.delete("/author/:id", async (req,res) => {
    try{
        const author = await Author.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(author)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})

app.patch("/author/:id", async (req,res) => {
    try{
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec()
        return res.status(201).send(author)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})


//user crud

app.post("/user", async (req, res) => {
    try {
        const users = await User.create(req.body);

        return res.status(201).send({ users });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
});

app.get("/user", async (req, res) => {
    try {
        const users = await User.find({}).lean().exec();
        return res.send({ users })

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

app.get("/user/:id", async (req,res) => {
    try{
        const user = await User.findById(req.params.id).lean().exec()
        return res.status(201).send(user)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})

app.delete("/user/:id", async (req,res) => {
    try{
        const userr = await User.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(userr)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})

app.patch("/user/:id", async (req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec()
        return res.status(201).send(userr)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})

// section crud

app.post("/section", async (req,res) => {
    try{
        const section = await Section.create(req.body)
        return res.status(201).send(section)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})

app.get("/section", async (req,res) => {
    try{
        const section = await Section.find().lean().exec()
        return res.status(201).send(section)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})
app.get("/section/:id", async (req,res) => {
    try{
        const section = await Section.findById(req.params.id).lean().exec()
        return res.status(201).send(section)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})

app.delete("/section/:id", async (req,res) => {
    try{
        const section = await Section.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(author)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})

app.patch("/section/:id", async (req,res) => {
    try{
        const section = await Section.findByIdAndUpdate(req.params.id, req.body, {new:true}).lean().exec()
        return res.status(201).send(section)
    }
    catch(e){
        return res.status(500).send({message:e.message, status:"failed"})
    }
})

//book crud

app.post("/books",async(req,res) => {
    const book  = await Book.create(req.body)
    return res.status(201).send(book)
})

app.get("/books",async(req,res) => {
    const book  = await Book.find({}).populate("author_id").lean().exec()
    return res.status(201).send({book})
})

app.get("/books/:id", async (req, res) => {
    const books = await Book.findById(req.params.id).lean().exec();
    return res.status(200).send({ books });
  });
  
  app.patch("/books/:id", async (req, res) => {
    const books = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send({ books });
  });
  
  app.delete("/books/:id", async (req, res) => {
    const books = await Book.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send({ books });
  });

  
//   -------------------crud acording to question ---------------

app.get("/book/checkedout", async (req, res) => {
    try {
        const books = await Book.find({ user_id: { $exists: true } }).populate("user_id").lean().exec()
        return res.send({ books })

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})


app.get("/author/:id/books", async(req, res) => {
    try{

        const author = await Author.findById(req.params.id).lean().exec()
        const books  = await Book.find({author_id: author._id}).lean().exec()
        res.send({books})

    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

app.get("/section/:id/books", async(req, res) => {
    try{

        const section = await Section.findById(req.params.id).lean().exec()
        const books  = await Book.find({section_id: section._id}).lean().exec()
        res.send({books})

    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

app.get("/book/notcheckedout", async (req, res) => {
    try {
        const books = await Book.find({ user_id: { $exists: false } }).populate("section_id").populate("author_id").lean().exec()
        return res.send({ books })

    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
})

app.get("/section/:sectionid/:authorid", async(req, res) => {
    try{

        const section = await Section.findById(req.params.sectionid).lean().exec()
        const author = await Author.findById(req.params.authorid).lean().exec()
        const books  = await Book.find({section_id: section._id, author_id: author._id}).lean().exec()
        res.send(books)

    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})
// app.get("/book/:author", async (req, res) => {

//     try {
//         const books = await Book.find().populate("author_id").lean().exec();
//         a1=[]
//         for(let i=0; i<books.length; i++) {
//             let author_id = books[i].author_id;
//             for(let j=0; j<author_id.length; j++) {
//                 if(author_id[j].author===req.params.author){
//                     a1.push(books[i]);
//                 }
//             }
//         }
//         return res.send(a1)

//     } catch (e) {
//         return res.status(500).json({ message: e.message, status: "Failed" });
//     }
// })


app.listen(2893, async () => {
    await connect()
    console.log("listening on port no 2893")
})