require("dotenv").config();

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));



const cats = [
    {
        title: "Kitty 1",
        description: "This is kitty 1",
        url: "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg"
    },
    {
        title: "Kitty 2",
        description: "This is kitty 2",
        url: "https://d3544la1u8djza.cloudfront.net/APHI/Blog/2020/07-23/How+Much+Does+It+Cost+to+Have+a+Cat+_+ASPCA+Pet+Insurance+_+black+cat+with+yellow+eyes+peeking+out-min.jpg"
    },
    {
        title: "Kitty 3",
        description: "This is kitty 3",
        url: "https://media.newyorker.com/photos/5dfab39dde5fcf00086aec77/1:1/w_1706,h_1706,c_limit/Lane-Cats.jpg"
    },
]



mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
},

   function (err){
    if(!err){
        console.log("Database connected...");
    }else {
        console.log(err)
    }
   }
);


const schema = new mongoose.Schema({
    title: String,
    description: String,
    url: String
})

const Kitty = mongoose.model("Kitty", schema)


// cats.forEach(cat => {
//     const newCat = new Kitty({
//         title: cat.title,
//         description: cat.description,
//         url: cat.url
//     })

//     newCat.save()
// });


app.get("/", (req,res) => {
    Kitty.find({}).then(
        items => res.json(items)
    ).catch(err => console.log(err))
});

app.listen(3001, function(){
    console.log("Server is running");
})