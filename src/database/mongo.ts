import {connect} from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const mongoConnect = async () => {

    try{
        console.log("Conectando ao servidor...")
        await connect(process.env.MONGO_URL as string);
        console.log("Conectado")
    }catch(error){
        console.log("Erro de conexão!", error)
    }

}