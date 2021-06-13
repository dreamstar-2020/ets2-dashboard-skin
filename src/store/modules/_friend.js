/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	_friend.js
 * Date: 	08/06/2021
 * Time: 	13:41
 */

import * as uFriend from '@/utils/_friend';
import * as _maps   from '@/utils/_maps';

// initial state
const state = () => ({
	me:      uFriend.make( 'Me' ),
	friends: {}
});

// getters
const getters = {
	me:      state => {
		return state.me;
	},
	friends: state => {
		return state.friends;
	}
};

// actions
const actions = {
	createFriend( { commit }, friend ) {
		friend.overlay = _maps.createFriendOverlay( friend );
		commit( 'addOrUpdateFriend', friend );
	}
};

// mutations
const mutations = {
	setMe( state, me ) {
		state.me = me;
	},
	addOrUpdateFriend( state, friend ) {
		const currentFriend = state.friends[ friend.code ];
		
		if ( currentFriend !== undefined )
			friend.overlay = currentFriend.overlay;
		
		state.friends[ friend.code ] = friend;
	}
	//setConfigActive( state, name ) {
	//	let skin = state.all.filter( skin => skin.id === name );
	//
	//	//console.log( skin, name );
	//
	//	if ( skin.length === 0 )
	//		throw 'NoSkinFound';
	//
	//	skin = _.first( skin );
	//	//console.log( skin );
	//
	//	state.currentSkin = skin;
	//}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
