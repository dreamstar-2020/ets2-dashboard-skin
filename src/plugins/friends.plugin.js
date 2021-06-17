/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	friends.plugin.js
 * Date: 	27/06/2021
 * Time: 	17:28
 */

import store  from '@/store';
import { io } from 'socket.io-client';

export default {
	store,
	install( Vue, options ) {
		console.log( 'Friend plugin' );
		
		Vue.mixin( {
			data() {
				return {
					friendSocket: null,
					connected:    false
				};
			},
			methods:  {
				friendInit() {
					if ( this.friendSocket === null ) {
						console.log( 'Init friends...' );
						
						const friendSocket = io.connect( 'ws://localhost:8999' );
						friendSocket.on( 'connect', () => {
							console.log( 'Friends UserList' );
							this.connected = true;
						} );
						
						friendSocket.on( 'fr:registered', ( user ) => {
							console.log( 'RR', user );
							store.commit( 'friend/setMe', { ...user, overlay: null } );
						} );
						
						this.friendSocket = friendSocket;
					}
				},
				registerMeFriend( name ) {
					console.log( 'Register', this.connected, name );
					
					if ( this.friendConnected )
						this.friendSocket.emit( 'fr:register', name );
				}
			},
			computed: {
				friendConnected() {
					return this.friendSocket !== null && this.connected;
				}
			}
			
		} );
	}
};