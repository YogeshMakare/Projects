const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel" )
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async(req,res)=>{
    console.log("getContact");
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not found")
    }
    res.status(200).json(contact);
    })

//@desc Get contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req,res)=>{ 
    const contacts = await Contact.find()
    res.status(200).json( contacts);
    })
 

//@desc Create contacts
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async(req,res)=>{
    console.log("Request body is",req.body);
    let {name ,email, phone} = req.body;
    if(!name || !email || !phone){
       res.status(400);
       throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create ({
        name, 
        email, 
        phone
    })
    res.status(201).json(contact);
    })

//@desc update contacts
//@route PUT /api/contacts
//@access public
const updateContact = asyncHandler (async(req,res)=>{
    console.log("updateContact");
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not found")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );

    res.status(200).json( updatedContact);
   })

//@desc delete contacts
//@route DELETE /api/contacts
//@access public
const deleteContact = asyncHandler(async(req,res)=>{
    console.log("deleteContact");
    console.log("🚀 ~ file: contactController.js:70 ~ deleteContact ~ req.params.id:", req.params.id)
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error ("Contact not found")
    }

     await Contact.findByIdAndRemove({ _id: req.params.id });
     

    return res.status(200).send(contact);
   })

    module.exports = {

        getContact, 
        getContacts,
        createContact,
        updateContact,
        deleteContact,
         
    }