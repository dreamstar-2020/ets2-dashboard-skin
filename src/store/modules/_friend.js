/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_friend.js
 * Date: 	08/06/2021
 * Time: 	13:41
 */

import store      from '@/store';
import * as _maps from '@/utils/_maps';
// initial state
const state = () => ({
	me:        {},
	friends:   {},
	connected: false,
	socket:    null
});

// getters
const getters = {
	me:        state => {
		return state.me;
	},
	friends:   state => {
		return state.friends;
	},
	connected: state => {
		return state.connected;
	},
	socket:    state => state.socket
};

// actions
const actions = {
	connect( { commit, getters } ) {
		const connected = getters[ 'connected' ];
		if ( !connected ) {
			return new Promise( (( resolve, reject ) => {
				const friendSocket = new WebSocket( 'ws://localhost:8999/' );
				
				commit( 'setSocket', friendSocket );
				commit( 'setConnected', true );
				
				friendSocket.addEventListener( 'open', () => {
					console.log( 'Friends UserList', connected );
					store.commit( 'friend/setConnected', true );
					resolve();
				} );
				
				friendSocket.addEventListener( 'error', event => {
					console.error( event );
					reject( new Error( event ) );
				} );
				
				friendSocket.addEventListener( 'message', raw => {
					const message = JSON.parse( raw.data );
					console.log( 'OnMessage', message );
					
					switch ( message.event ) {
						case 'fr:registered':
							console.log( 'RR', message.data );
							store.commit( 'friend/setMe', { ...message.data, overlay: null } );
							break;
						
						case 'fr:userList':
							console.log( 'list', message.data );
							for ( const friend in message.data )
								store.commit( 'friend/addOrUpdateFriend', { ...friend, overlay: null } );
							break;
					}
				} );
				
			}) );
		}
	},
	register( { commit, getters }, name ) {
		const connected = getters[ 'connected' ];
		const socket    = getters[ 'socket' ];
		
		console.log( 'Register', connected, name );
		
		if ( connected )
			socket.send( JSON.stringify( {
				event: 'fr:register',
				data:  name
			} ) );
	},
	createFriend( { commit }, friend ) {
		friend.overlay = _maps.createFriendOverlay( friend );
		commit( 'addOrUpdateFriend', friend );
	}
};

// mutations
const mutations = {
	setSocket( state, socket ) {
		state.socket = socket;
	},
	setMe( state, me ) {
		console.log( 'Update user', me );
		state.me = me;
	},
	setConnected( state, connected ) {
		console.log( 'Update connected' );
		state.connected = connected;
	},
	addOrUpdateFriend( state, friend ) {
		const currentFriend = state.friends[ friend.code ];
		
		if ( currentFriend !== undefined )
			friend.overlay = currentFriend.overlay;
		
		state.friends[ friend.code ] = friend;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
