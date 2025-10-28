import { MongoClient } from "mongodb";

let conn;

const conStr = "mongodb://localhost:27017/media";

const connectDB = (cb) => {
    MongoClient.connect(conStr).then(client =>{
        conn = client.db();
        cb();
    }).catch(err=>{
        console.log("Error is ", err);
        cb(err);
    })
}

const getConn = () =>  conn;

export {getConn,connectDB};
