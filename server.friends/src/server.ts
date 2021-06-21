import * as express from 'express';
import * as http    from 'http';
import { Server }   from 'ws';
import { UserList } from '../../server.dev/src/User';

const port = 8999;

// --

let app    = express.default();
let server = http.createServer( app );

// --

const userList = new UserList();


server.listen( process.env.PORT || port, () => {
	console.log( 'Plop', server.address() );
} );

const ws = new Server( { server } );
ws.on( 'connection', ( socket ) => {
	function s4() {
		return Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 ).substring( 1 );
	}
	
	const uid = s4() + s4() + '-' + s4();
	console.log( 'New connection', uid );
	
	socket.on( 'message', raw => {
		const message = JSON.parse( raw );
		console.log( 'OnMessage', message );
		
		switch ( message.event ) {
			case 'fr:register':
				// console.log( message.event );
				userList.register( uid, message.data );
				socket.send( JSON.stringify( {
					event: 'fr:registered',
					data:  userList.get( uid )
				} ) );
				break;
		}
	} );
	
	// socket.on( 'fr:update', () => {
	// 	console.log( 'fr:update' );
	// 	user.lat  = 1.20000;
	// 	user.long = 2.20000;
	// 	user.rot  = 3.20000;
	// 	userList.update( socket.id, user );
	// 	console.log( userList );
	// } );
} );


setInterval( () => {
	if ( !userList.isEmpty() ) {
		// console.log( userList );
		// ws.send( 'fr:userList', userList );
	}
}, 1000 );
