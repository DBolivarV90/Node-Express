var Imagen = require("../models/imagenes");
var owner_check= require("./image_permission");//Middleware que chequea los permisos de un usuario sobre una imagen

module.exports= function(req,res,next){
//populate que en este caso sirve como el Join en bases de datos relacionales
Imagen.findById(req.params.id).populate("creator").exec(function(err,imagen){
if(imagen!=null&& owner_check(imagen,req,res))
{
    
    res.locals.imagen=imagen;
    next();
}
else{
    res.redirect("/app");
}
})

}