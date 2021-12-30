const { MongoClient } = require( 'mongodb');

// const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const url = "mongodb://localhost:27017";
const client = new MongoClient( url );

const mongoDB = async () => { 
    
    try {
    
        const connectedClient = await client.connect();    
        
        console.log("  ✔️  connected succesfuly to DB" );
        return { 
            rssarchive: connectedClient.db( "rssarchive" )
        }
        
    } catch (error) { throw error+ "  ❌  could not connect succesfuly to DB" }
}

module.exports ={ mongoDB }


