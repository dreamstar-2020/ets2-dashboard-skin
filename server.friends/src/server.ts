import * as express                   from 'express';
import * as http                      from 'http';
import { UserList }                   from '../../server.dev/src/User';
import { Socket, SocketCallbackData } from './utils/socket.utils';

const port = 8999;

// --

let app    = express.default();
let server = http.createServer( app );

// --

const userList = new UserList();


server.listen( process.env.PORT || port, () => {
	console.log( 'Plop', server.address() );
} );

const socketServer = new Socket( server );
socketServer.on( 'fr:register', ( callbackData: SocketCallbackData ) => {
	console.log( callbackData.event );
	
	userList.register( callbackData.uid, callbackData.data );
	callbackData.client.send( JSON.stringify( {
		event: 'fr:registered',
		data:  userList.get( callbackData.uid )
	} ) );
} );

socketServer.start();

// 	// client.on( 'fr:update', () => {
// 	// 	console.log( 'fr:update' );
// 	// 	user.lat  = 1.20000;
// 	// 	user.long = 2.20000;
// 	// 	user.rot  = 3.20000;
// 	// 	userList.update( client.id, user );
// 	// 	console.log( userList );
// 	// } );

setInterval( () => {
	if ( !userList.isEmpty() ) {
		// console.log( userList );
		// ws.send( 'fr:userList', userList );
	}
}, 1000 );
