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

    expressInit.post( "/login", async ( req, res ) => {
        const { userName, password } = req.body
        //TODO: password verification with JWT
        const user = await rssarchive.collection('users').findOne( { userName, password } );

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
    
    expressInit.post("/saveArticle", async ( req, res ) => { 

        const { user, articleData } = req.body
        const find = { userName: user.userName };

        const existentUser = await rssarchive.collection('users').findOne( find );
        if ( existentUser ) {

            const archived = [ ...existentUser.archived, articleData ];

            const set = { $set: { archived } }
            const update = await rssarchive.collection('users').updateOne( find, set );

            if (update.modifiedCount) response = {
                code: 200,
                res: { ...existentUser, archived: archived },
                message: 'Saved Article'
            }

        } 
        console.log( response.code, response.message);
        return res.send( response )

    })

    expressInit.post("/deleteArticle", async ( req, res ) => { 

        const { user, articleData } = req.body
        const find = { userName: user.userName };

        let existentUser = await rssarchive.collection('users').findOne( find );
        if ( existentUser ) {
            
            const archived = existentUser.archived.filter(  _article  => _article.id !== articleData.id )

            const set = { $set: { archived } }
            const update = await rssarchive.collection('users').updateOne( find, set );

            if (update.modifiedCount) response = {
                code: 200,
                res: { ...existentUser, archived:archived },
                message: 'Deleted Article'
            }

        } 
        console.log( response.code, response.message);
        return res.send( response )

    })
}

module.exports = router 