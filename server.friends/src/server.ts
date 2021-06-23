import { Socket, SocketClientData, SocketEventData } from './utils/socket.utils';
import { UserList }                                  from './utils/user.utils';

const port = 8999;

const userList = new UserList();

const socketServer = new Socket( port );
socketServer.on( 'fr:register', ( eventData: SocketEventData ) => {
	console.log( eventData.event );
	
	userList.register( eventData.uid, eventData.data );
	SocketClientData.send( eventData.client, 'fr:registered', userList.get( eventData.uid ) );
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
		// socketServer.websocketServer.send( 'fr:userList', userList );
	}
}, 1000 );
