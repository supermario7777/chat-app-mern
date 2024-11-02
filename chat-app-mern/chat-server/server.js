const express = require( "express" );
const { chats } = require( "./data/data" );
const connectDB = require( "./config/db" );
const dotenv = require( "dotenv" ).config();
const colors = require( "colors" );
const userRoutes = require( "./routes/userRoutes" );
const chatRoutes = require( "./routes/chatRoutes" );
const messageRoutes = require( "./routes/messageRoutes" )
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
app.use( "/api/message", messageRoutes );

app.use( notFound );
app.use( errorHandler );

const PORT = process.env.PORT || 3001

const server = app.listen( PORT, console.log( `Server is running on Port ${PORT}`.yellow.bold ) )

const io = require( "socket.io" )( server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
} );

io.on( "error", ( err ) =>
{
    console.error( "Socket.IO Error:", err );
} );


io.on( "connection", (socket) =>
{
    console.log( "connected to socket.io" );

    socket.on( "setup", ( userData ) =>
    {
        socket.join( userData._id );
        socket.emit( "connected" )
    } );

    socket.on( "join chat", ( room ) =>
    {
        socket.join( room );
        console.log( "User joined to the room: " + room );
    } );

    socket.on( "typing", ( room ) => socket.in( room ).emit( "typing" ) );
    socket.on( "stop typing", ( room ) => socket.in( room ).emit( "stop typing" ) );
    
    socket.on( 'new message', ( newMessageReceived ) =>
    {
        var chat = newMessageReceived.chat;

        if ( !chat.users ) return console.log( "chat.users not defined" );

        chat.users.forEach( user =>
        {
            if ( user._id == newMessageReceived.sender._id ) {
                return;
            }

            socket.in( user._id ).emit( "message received", newMessageReceived );
        } );
    } );

    socket.off( "setup", () =>
    {
        console.log( "User disconnected" );
        socket.leave(userData._id)
    })
})