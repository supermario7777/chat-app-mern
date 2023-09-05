const express = require( "express" );
const { chats } = require( "./data/data" );
const connectDB = require( "./config/db" );
const dotenv = require( "dotenv" ).config();
const colors = require( "colors" );
const userRoutes = require( "./routes/userRoutes" );
const chatRoutes = require( "./routes/chatRoutes" );
const { notFound, errorHandler } = require( "./middleware/errorMiddleware" );

connectDB();
const app = express();

app.use( express.json() ); // чтобы принимать JSON данные

app.get( "/", ( req, res ) =>
{
    res.send( "API is running" )
} );


app.use( "/api/user", userRoutes );
app.use( "/api/chat", chatRoutes );

app.use( notFound );
app.use( errorHandler );

const PORT = process.env.PORT || 3001

app.listen( PORT, console.log( `Server is running on Port ${PORT}`.yellow.bold ) )