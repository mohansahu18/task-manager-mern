import mongoose from "mongoose"


const DbConnection = () => {
    try {
        mongoose.connect(process.env.MONGOURL)
        console.log("db connected sucessfully");
    } catch (error) {
        console.log(`issue with db connection${error}`);
    }
}
export default DbConnection

