/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	client.utils.ts
 * Date: 	23/06/2021
 * Time: 	19:52
 */

import * as express          from 'express';
import http                  from 'http';
import WebSocket, { Server } from 'ws';

export class Socket {
	private readonly _websocketServer: WebSocket.Server;
	private readonly _server: http.Server;
	private _events: SocketEvent[] = [];
	
	constructor( port: number = 8999 ) {
		const app             = express.default();
		this._server          = http.createServer( app );
		this._websocketServer = new Server( {
			server: this._server
		} );
		
		this._server.listen( process.env.PORT || port, () => {
			console.log( 'Plop', this._server.address() );
		} );
	}
	
	get websocketServer(): WebSocket.Server {
		return this._websocketServer;
	}
	
	public start(): void {
		this._websocketServer.on( 'connection', ( client: WebSocket ) => {
			const uid = Socket.generateUid();
			console.log( 'New connection', uid );
			
			client.on( 'message', raw => {
				const parsed: SocketClientData = JSON.parse( raw );
				
				this._events.forEach( event => {
					if ( event.name === parsed.event )
						event.callback( new SocketEventData( parsed.event, client, uid, parsed.data ) );
				} );
			} );
		} );
	}
	
	public on( eventName: string, callback: any ) {
		this._events.push( new SocketEvent( eventName, callback ) );
	}
	
	private static generateS4(): string {
		return Math.floor( ( 1 + Math.random() ) * 0x10000 ).toString( 16 ).substring( 1 );
	}
	
	private static generateUid(): string {
		return Socket.generateS4() + Socket.generateS4() + '-' + Socket.generateS4();
	}
}

export class SocketEvent {
	public name: string;
	public callback: any;
	
	constructor( name: string, callback: any ) {
		this.name     = name;
		this.callback = callback;
	}
}

export class SocketClientData {
	public event: string;
	public data: object;
	
	constructor( event: string, data: object ) {
		this.event = event;
		this.data  = data;
	}
	
	public static send( client: WebSocket, event: string, data: any ) {
		client.send( JSON.stringify( {
			event: event,
			data:  data
		} ) );
	}
}

export class SocketEventData {
	public event: string;
	public client: WebSocket;
	public uid: string;
	public data: object | string;
	
	constructor( event: string, client: WebSocket, uid: string, data: object | string ) {
		this.event  = event;
		this.client = client;
		this.uid    = uid;
		this.data   = data;
	}
}