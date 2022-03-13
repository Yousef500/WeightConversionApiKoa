const {MongoClient, ServerApiVersion} = require("mongodb");

const client = new MongoClient(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

// DATABASE_URI="mongodb+srv://Kazuya:Kirito-san500@test.hfvnn.mongodb.net/Test?retryWrites=true&w=majority"


client.connect(err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log("Successfully connected to mongodb");
});

module.exports = client;

