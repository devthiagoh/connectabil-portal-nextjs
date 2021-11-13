import mongoose from "mongoose";

const connection = { isConnected  };

async function dbConnect(){

    if(connection.isConnected) return;

    //COMO O ARQUIVO .env.local NÃO VAI NO COMMIT POR SEGURANÇA, 
    //ENTÃO DEIXEI EXPLÍCITO A URI PARA QUE SEJA POSSÍVEL EXECUTAR O PROJETO LOCALMENTE
    
    const URI = 'mongodb+srv://devthiagoh:sMAfpyhuIIk6TkdM@cluster0.ldrli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const db = await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    connection.isConnected = db.connections[0].readyState
}

export default dbConnect;