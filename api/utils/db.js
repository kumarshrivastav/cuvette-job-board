import mongoose from "mongoose";
async function ConnectDB(){
    try {
        const conn=await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        console.log(`MongoDB Connected Successfully at http://${conn.connection.host}:${conn.connection.port}`)
    } catch (error) {
        console.log(`Error Occured during Connectiong DB:${error}`)
    }
}
export default ConnectDB;