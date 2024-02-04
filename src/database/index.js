import mongoose from "mongoose";

const configOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}
const connectToDB = async() =>{
    const connectUrl = "mongodb+srv://luke:skywalker@db-starwars-ecommerce.zjuou69.mongodb.net/?retryWrites=true&w=majority"

    mongoose.connect(connectUrl,configOptions).then(() => console.log("Database connected Successful")).catch((err) => console.log(`Error to connect Database ${err.message}`))
}

export default connectToDB;