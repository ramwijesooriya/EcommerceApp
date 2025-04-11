import mongoose from "mongoose";

let cached =golobal.mongoose
if (!cached) {
    cached=global.mongoose = { conn: null, promise: null }

}   

async function connectDB() {
if(cached.conn) {
    return cached.connk
}
if(!cached.promise) {
    const opts = {
        bufferCommands: false,
    }
    cached.promise = mongoose.connect(`${process.env.MONGODB_URI, opts}/quickcart`).then(mongoose => {
        return mongoose
    })
}

cached.conn = await cached.promise
return cached.conn
}

export default connectDB