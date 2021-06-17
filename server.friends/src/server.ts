import Cors         from 'cors';
import * as express from 'express';
import * as http    from 'http';
import { Server }   from 'socket.io';
import { UserList } from '../../server.dev/src/User';

const port = 8999;

// --

let app    = express.default();
let server = http.createServer( app );
app.use( Cors( {
	origin: /http:\/\/localhost:\d+/
} ) );

// --

const io = new Server( server, {
	cors: {
		origin:  /http:\/\/localhost:\d+/,
		methods: [ 'GET', 'POST' ]
	}
} );

const userList = new UserList();

io.on( 'connection', ( socket ) => {
	console.log( 'New connection' );
	
	socket.on( 'fr:register', ( name ) => {
		console.log( 'fr:register' );
		userList.register( socket.id, name );
		let a = userList.get( socket.id );
		console.log( a );
		
		socket.emit( 'fr:registered', a );
	} );
	
	socket.on( 'fr:update', () => {
		console.log( 'fr:update' );
		user.lat  = 1.20000;
		user.long = 2.20000;
		user.rot  = 3.20000;
		userList.update( socket.id, user );
		console.log( userList );
	} );
} );

server.listen( process.env.PORT || port, () => {
	console.log( 'Plop', server.address() );
} );
