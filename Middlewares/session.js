/** Middleware que se encarga de que solo 
 * los usuarios autenticados puedan ingresar a ciertas rutas*/
 //importamos el modelo, para poder acceder a la coleccion de usuarios
 var User= require("../models/user").User; 
 module.exports= function(req,res,next){

    //Validamos que haya una sesion iniciada, si no la hay, se redirige al login
    if(!req.session.user_id)
    {
      res.redirect("/login")
    }
    else
    {  //Capturamos toda la informacion del usuario logueado, para enviarlo a todas las vistas del Middelware
        User.findById(req.session.user_id,function(err,user){
          if(err)
          {
              console.log(err);
              res.redirect("/login");
        
          }
          else
          {
              res.locals ={ user: user};
              next();
          }  
        });
        
    }
 }