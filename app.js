var express = require("express");
var bodyParser= require("body-parser");
var User = require("./models/user").User;
var cookieSession = require("cookie-session");
var router_app= require("./routes_app");
var session_middleware= require("./Middlewares/session");
var methodOverride = require("method-override");
var formidable= require("express-form-data");

var app= express();


app.use(express.static('public')); //metodo que utilizamos para usar un middleware, en este caso cargamos el middleware que trae por defecto express que es para archivos estaticos
app.use(bodyParser.json());//Middleware para peticiones application/json
app.use(bodyParser.urlencoded({extended:true}));

app.use(methodOverride("_method"));//Colocamos el nombre del metodo a utilizar, nombre colocado por nosotros, chequear el formulario de Edit, para que de esta manera la aplicacion entienda a que metodo nos referimos. 
/* 
/app*/

app.use(cookieSession({
    name: "session",
    keys:["llave-1","llave-2"]
}));//Middleware para el manejo de sessiones, cada session tiene un identificador unico, colocamos un secret random
//app.use(formidable({ keepExtensions:true}));
app.use(formidable.parse({ keepExtensions:true}));//Para guardar las imagenes que el usuario suba, se guardan en una carpeta temporal, keepExtensions permite mantener la ruta aunque la carpeta se haya eliminado


app.set("view engine","jade");

app.get("/", function(req,res){
    console.log(req.session.user_id);
    res.render("index");
});
app.get("/signup", function(req,res){
    User.find(function(err,doc){
        console.log(doc);
        res.render("signup");    
    });   
    
});
app.get("/login", function(req,res){
   
        res.render("login");    
      
    
});

app.post("/users",function(req,res){
    var user = new User({email: req.body.email,
                         username: req.body.username,  
                         password: req.body.password,
                         password_confirmation: req.body.password_confirmation});
    console.log(user.password_confirmation);                   
    
     user.save().then(function(us){
         res.send("Guardamos el usuario exitosamente ");
     },function(err){
         if(err)
         {
             console.log(String(err));
             res.send("No pudimos guardar la informacion");
        }
     });
    
    /* otra manera de guardadar la informacion en la base de datos
      user.save(function(err){

        if(err)
        {
         console.log(String(err));
        }
        res.send("Guardamos tus datos");
    });
   */
 

});

//Como encontrar documentos en nuestra coleccion
app.post("/sessions",function(req,res){
User.findOne({email:req.body.email,password:req.body.password},function(err,user){
    req.session.user_id=user._id; 
    res.redirect("/app"); 
});

});

app.use("/app",session_middleware);
app.use("/app",router_app);

app.listen(8080);