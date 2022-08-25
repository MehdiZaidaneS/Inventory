require("dotenv").config(); //Habilitamos el dotenv

//Lo requirimientos basicos.
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const app = express();

//Que usa la App
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));


//Conectando a la base de datos de Mongoose.
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

//Para anadir mas forms
const forms = [
    {
        title: "Chargers",
        description: "There are 40 chargers",
        url: "https://i.ebayimg.com/images/g/n7EAAOxyHE5RthyP/s-l500.jpg"
    }
]

//Esquema basico de mi Collection
const schema = new mongoose.Schema({
    title: String,
    description: String,
    url: String
})

//El model de mi Collection.
const Kitty = mongoose.model("Kitty", schema)


//Guardando cada form anadidos arriba

//  forms.forEach(form => {
//      const newForm = new Kitty({
//          title: form.title,
//          description: form.description,
//          url: form.url
//      })

//      newForm.save()
//  });


//Que muestra nuestra aplicacion backend. Y luego busca en nuestra Collection todos los items  y los muestra en formato JSON.
app.get("/", (req,res) => {
    Kitty.find({}).then(
        items => res.json(items)
    ).catch(err => console.log(err))
});

app.listen(3001, function(){
    console.log("Server is running");
})