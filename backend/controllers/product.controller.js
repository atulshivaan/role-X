import Products from "../models/product.model.js";
import Users from "../models/user.model.js";
import { Op } from "sequelize";

export const getProducts =async(req,res)=>{
try {
    let response;
    if(req.role==="admin")
    {
        response=await Products.findAll({
            attributes:['uuid','name','price'],
            include:[
                {
                    model:Users,
                    attributes:['name', 'email']
                }
            ]
        });
    }
    else{
        response =await Products.findAll({
            attributes:['uuid','name','price'],
            where:{
                userId :req.userId
            },
            include:[{
                model:Users,
                attributes:['name', 'email']
            }]
        });
    }
    res.status(200).json({
        success:true,
        message:response
    })
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
}
} 
export const getProductsById =async(req,res)=>{
    try {

        const product = await Products.findOne({
            where :{
                uuid :req.params.id
            }
        })
        if(!product)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        let response;
        if(req.role==="admin")
        {
            response=await Products.findOne({
                attributes:['uuid','name','price'],
                where:{
                      id:product.id
                },
                include:[
                    {
                        model:Users,
                        attributes:['name', 'email']
                    }
                ]
            });
        }
        else{
            response =await Products.findOne({
                attributes:['uuid','name','price'],
                where:{
                    [Op.and]:[{id : product.id},{userId :req.userId}]
                    
                },
                include:[{
                    model:Users,
                    attributes:['name', 'email']
                }]
            });
        }
        res.status(200).json({
            success:true,
            message:response
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
} 
export const createProducts =async(req,res)=>{
    const {name,price}=req.body;
    try {
        await Products.create({
            name:name,
            price:price,
            userId:req.userId
        })
        res.status(201).json({
            success:true,
            message:"Prodyct created"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
} 
export const updateProducts =async(req,res)=>{
    const {name,price}= req.body;
    try {

        const product = await Products.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
    
        if(req.role==="admin")
        {
            await Products.update({name , price},{
                where:{
                    id:product.id
                }
            })
        }
        else{
            if(req.userId !== product.userId)
            {
                return res.status(403).json({
                    success:false,
                    message:"access deneid"
                })
            }
            await Products.update({name , price},{
                where:{
                    [Op.and]:[{id : product.id},{userId :req.userId}]

                    
                }
            });
        }
        res.status(200).json({
            success:true,
            message:"prodcut update succesfullt"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
} 
export const deleteProducts =async(req,res)=>{
    const {name,price}= req.body;
    try {

        const product = await Products.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
    
        if(req.role==="admin")
        {
            await Products.destroy({
                where:{
                    id:product.id
                }
            })
        }
        else{
            if(req.userId !== product.userId)
            {
                return res.status(403).json({
                    success:false,
                    message:"access deneid"
                })
            }
            await Products.destroy({
                where:{
                    [Op.and]:[{id : product.id},{userId :req.userId}]

                    
                }
            });
        }
        res.status(200).json({
            success:true,
            message:"prodcut deleted succesfullt"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
} 