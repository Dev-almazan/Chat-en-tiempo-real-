
import express from "express";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routerView = new express.Router();

// Add routes
routerView.get('/',(req,res)=>
{
    res.render("index");
})

export default routerView;
