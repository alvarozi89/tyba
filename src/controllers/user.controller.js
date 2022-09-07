const userCtrl = {};
const userModel = require('../models/user.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const nodemailer = require("nodemailer");

userCtrl.crearUsuario = async(req,res)=>{
    const {name,email,password}= req.body 
    const newUser = new userModel({
        name,
        email,
        password
    })
    const userEmail = await userModel.findOne({email:email})
    if(userEmail) {
        res.json({
            mensaje: 'El usuario ya existe'
        })
    }
    else if(name==null || email == null || password==null){
        res.json({
            mensaje: 'Los campos deben estar diligenciados en su totalidad'
        })
    }
    else {
        newUser.password = await bcrypt.hash(password,10)
        const token = jwt.sign({_id:newUser._id},config.secret.word)
        await newUser.save()
        res.json({
            mensaje: 'Bienvenido',
            id: newUser._id,
            nombre: newUser.nombre,
            token
        })
    }
}

userCtrl.login = async(req,res)=>{
    const {email,password}= req.body
    userModel.findOne({email:email}).populate('city').exec((err,data)=>{
        if(!data){
            return res.json({
                mensaje: 'correo incorrecto'
            })
        }
        const match =  bcrypt.compare(password,data.password)
        if(match){
             
            res.json({
                mensaje: 'Bienvenido',
                id: data.id,
                nombre: data.name,
                Restaurante: data.city.restaurant,
                ciudad: data.city.name,
                
            })
            
        }
    
        else {
            res.json({
                mensaje:'Contraseña incorrecta'
            })
        }
    })
   

}


userCtrl.listar = async(req,res)=>{
    userModel.find().populate('city').exec((err,data)=>{
      if(data){
        res.json({
            listar:data
        })
      }else{
          res.status(404).send({message: "No hay ningun registro de usuario"});
      }
 
    });
}

userCtrl.listarId = async(req,res)=>{
    const id = req.params.id
    const respuesta =await userModel.findById({_id:id})
    res.json(respuesta)
}

userCtrl.listarNombre = async (req,res)=>{
    const {name} = req.params;
    const respuesta = await userModel.find({name:{$regex:"^"+ name,$options:'i'}})
    res.json(respuesta)
}

userCtrl.recuperarContrasena = async (req,res)=>{
    const {email}= req.body
    const respuesta = await userModel.findOne({email:email})
    if(!respuesta){
        return res.json({
            mensaje: 'El correo no se encuentra registrado en la bd'
        })
    }
    else {
          // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: config.email.email, // generated ethereal user
          pass: config.email.pass, // generated ethereal password
        },
      });
      // send mail with defined transport object
      const token = jwt.sign({_id:respuesta._id},config.secret.word)
      let info   = await transporter.sendMail({
        from: '"TecnoPac 👻" <cgamertechnology@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "hola", // plain text body
        html: `<b>A continuación encontraras el codigo que debes copiar para restablecer tu contraseña</b> </br> <h2>Código:</h2>${token} `, // html body
        
      });
      
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return res.json({
            mensaje: 'Se ha enviado a su correo  un link para restablecer la constraseña '+email,
            pass: respuesta.password
        })
    }
}

userCtrl.nuevaContraseña = async (req,res)=>{
    const id = req.params.id 
    await userModel.findByIdAndUpdate({_id:id},req.body)
    const respuesta =await userModel.findById({_id:id})
    res.json({
        mensaje: 'contraseña actualizada',
        respuesta
    })
}


userCtrl.actualizarUsuario= async(req,res)=>{
    const id = req.params.id 
    await userModel.findByIdAndUpdate({_id:id},req.body)
    const respuesta =await userModel.findById({_id:id})
    res.json({
        mensaje: 'Usuario actualizado',
        respuesta
    })
} 


userCtrl.elimarUsuario = async(req,res)=>{
    const id = req.params.id
    await userModel.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'Usuario eliminado'
    })
}

module.exports= userCtrl