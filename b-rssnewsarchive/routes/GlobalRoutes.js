const { mongoDB } = require('../DB/config');
const mongoInit = mongoDB();

const router = async ( expressInit ) => {
    
    //* COLLECTIONS
    let { rssarchive } = await mongoInit
    
    let response = {
        code: 400,
        response:{},
        message: "Error: unexpected"
    }

    expressInit.get( "/login", async ( req, res ) => {

        //TODO: password verification
        const user = await rssarchive.collection('users').findOne( { ...req.query } );

        if ( user ) {
            response = {
                code: 200,
                response: user,
                message: "Found user successfully."
            }
        }

        console.log( response.code, req.query, response.message);
        return res.send( response )
    });
    
    expressInit.post("/register", async ( req, res ) => { 

        const { userName, password } = req.body

        const userSchema = {
            userName,
            password,
            role: 1,
            archived:[]
        }

        let existentUser = await rssarchive.collection('users').findOne( { userName } );

        if ( existentUser ) {
            response = {
                code: 400,
                response: existentUser,
                message: `Error: ${ existentUser.userName } already exists`
                
            } 
            return res.send( response )
        } 
    
        const user = await rssarchive.collection('users').insertOne( { ...userSchema } );
        if ( user ) {
            existentUser = await rssarchive.collection('users').findOne( { _id: user.insertedId } )
            response = {
                code: 200,
                response: existentUser,
                message: ` ${ existentUser.userName } Account created successfully `
            }
        } 

        console.log( response.code, req.body, response.message);
        return res.send( response )

    })
    
}

module.exports = router 