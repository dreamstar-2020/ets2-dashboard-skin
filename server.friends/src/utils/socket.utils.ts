/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	client.utils.ts
 * Date: 	23/06/2021
 * Time: 	19:52
 */

import http                  from 'http';
import WebSocket, { Server } from 'ws';

export class Socket {
	private readonly _server: Server;
	private _events: SocketEvent[] = [];
	
	constructor( server: http.Server ) {
		this._server = new Server( { server } );
	}
	
	get server(): WebSocket.Server {
		return this._server;
	}
	
	public start(): void {
		this._server.on( 'connection', ( client: WebSocket ) => {
			const uid = this.generateUid();
			console.log( 'New connection', uid );
			
			client.on( 'message', raw => {
				const parsed: SocketMessageData = JSON.parse( raw );
				
				this._events.forEach( event => {
					if ( event.name === parsed.event )
						event.callback( new SocketCallbackData( parsed.event, client, uid, parsed.data ) );
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
	
	private generateUid(): string {
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

export class SocketMessageData {
	public event: string;
	public data: object;
	
	constructor( event: string, data: object ) {
		this.event = event;
		this.data  = data;
	}
}

export class SocketCallbackData {
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