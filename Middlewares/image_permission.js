var Imagen= require("../models/imagenes");

module.exports= function(image,req,res){
if(typeof image.creator=="undefined")return false

//True = tiene permisos
//false = Si no tiene permisos 
    if(req.method==="GET"&&req.path.indexOf("edit")<0)
{
    //El usuario esta tratando de ver la imagen 
    return true;
}
if(image.creator._id.toString()==res.locals.user._id)
{
    //Esta imagen pertenece al usuario logueado
return true;
}
return false;
}