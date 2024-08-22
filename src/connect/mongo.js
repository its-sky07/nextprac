// mongodb+srv://<db_username>:<db_password>@cluster0.ph6tlur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// lib/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
 try {
     if (mongoose.connections[0].readyState) {
       return; // Use current connection
     }
   
     await mongoose.connect(process.env.MONGO_URI);
     console.log("database connected")
 } catch (error) {
    console.error( "not connected",error);
    
 }
};

export default connectDB;
