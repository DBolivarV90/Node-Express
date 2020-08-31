var mongoose= require("mongoose");
var Schema= mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");//conexion a la base de datos

var posibles_valores=["M","F"];
var password_validation= {
    validator: function(p){
        return this.password_confirmation==p;
    } ,
    message:"Las contraseñas no son iguales"
}

//Schema va a definir la estructura de nuestra coleccion
var user_schema = new Schema({
name:String,
username: {type:String, required:true,maxlength:[50,"username muy grande"]},
password:{
    type: String, minlength:[8,"password muy corto"],
    validate: password_validation 
},
age: {type: Number, min:[5,"la edad no puede ser menor a 5"],max:[100,"la edad no puede ser mayor a 100"]},//validamos el minimo y maximo de edad
email: {type: String, required: "el correo es obligatorio"},//validamos que el campo no sea nulo
date_of_birth: Date,
sex:{type: String, enum:{values: posibles_valores,message:"Opcion no valida"}}
});
//usamos virtual para validar la contraseña, el atributo password_confirmation no se guarda en la base de datos al ser virtual 
user_schema.virtual("password_confirmation").get(function(){
return this.p_c;

}).set(function(password){
    this.p_c=password;
});

var User = mongoose.model("User",user_schema);

module.exports.User= User;