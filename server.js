// import
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const admin = require("firebase-admin")
const credentials = require("./key.json")

const app = express()
admin.initializeApp({
    credential:admin.credential.cert(credentials)
})
const db = admin.firestore()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.post("/create", async(req,res)=>{
    try {
        console.log('data = ',req.body)
        const id = req.body.email
        const userJson = {
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        }
        console.log('userJson',userJson)
        const response = await db.collection('users').doc(id).set(userJson)
        console.log('reach this line')
        console.log('response',response)
        res.send(response)
        
       
    } catch (error) {
        res.send(error)
    }
   
})
app.get("/read/all",async (req,res)=>{
    try {
            const usersRef = db.collection('users');
            const response = await usersRef.get()
            let responseArr =[];
            response.forEach(doc=>{
                responseArr.push(doc.data())
            })
            res.send(responseArr)
    } catch (error) {
        res.send(error)
    }
})
app.get("/read/:id",async (req,res)=>{
    try {
            const usersRef = db.collection('users').doc(req.params.id);
            const response = await usersRef.get()
            res.send(response.data())
    } catch (error) {
        res.send(error)
    }
})
app.post("/update",async (req,res)=>{
    try {
    const id =req.body.id
    const newFN ="hello worlddd"
            const usersRef = db.collection('users').doc(id).update({
            firstName:newFN
            });
            console.log('usersRef',usersRef)
            const response = await usersRef.get()
            res.send(response)
    } catch (error) {
        res.send(error)
    }
})
app.post("/ingredients", async(req,res)=>{
    try {
        console.log('data = ',req.body)
        const id = req.body.key
        const userJson = {
            key:req.body.key,
            name:req.body.name,
            category:req.body.category,
            unit:req.body.unit,
            unitPrice:req.body.unitPrice,
            // productSize:req.body.productSize
        }
        console.log('userJson',userJson)
        const response = await db.collection('ingredients').doc(id).set(userJson)
        console.log('reach this line')
        console.log('response',response)
        res.send(response)
        
    } catch (error) {
        res.send(error)
    }
   
})
app.get("/ingredients",async (req,res)=>{
    try {
            const usersRef = db.collection('ingredients');
            const response = await usersRef.get()
            let responseArr =[];
            response.forEach(doc=>{
                responseArr.push(doc.data())
            })
            res.send(responseArr)
    } catch (error) {
        res.send(error)
    }
})
app.post("/menus", async(req,res)=>{
    try {
        console.log('data = ',req.body)
        const id = req.body.key
        const userJson = {
          
            key:req.body.key,
            name:req.body.name,
            cost:req.body.cost,
            costPercent:req.body.costPercent,
            yieldPercent:req.body.yieldPercent,
            ingredients:req.body.Ingredient
       
        }
        console.log('userJson',userJson)
        const response = await db.collection('menus').doc(id).set(userJson)
        console.log('reach this line')
        console.log('response',response)
        res.send(response)
        
    } catch (error) {
        res.send(error)
    }
   
})
app.get("/menus",async (req,res)=>{
    try {
            const usersRef = db.collection('menus');
            const response = await usersRef.get()
            let responseArr =[];
            response.forEach(doc=>{
                responseArr.push(doc.data())
            })
            res.send(responseArr)
    } catch (error) {
        res.send(error)
    }
})
app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})