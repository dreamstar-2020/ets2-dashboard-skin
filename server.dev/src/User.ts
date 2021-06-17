/**
 * @author:	Emmanuel SMITH <hey@emmanuel-smith.me>
 * project:	ets2-dashboard-skin
 * file: 	User.ts
 * Date: 	16/06/2021
 * Time: 	21:52
 */

export class User {
	name: string;
	long: number = 0;
	lat: number  = 0;
	rot: number  = 0;
	code: string;
	
	constructor( name: string ) {
		this.name = name;
		this.code = this.generateCode();
	}
	
	private generateCode(): string {
		const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const numbers = '0123456789';
		let code      = '';
		
		for ( let i = 0; i < 2; i++ )
			code += letters.charAt( Math.floor( Math.random() * letters.length ) );
		
		code += '-';
		
		for ( let i = 0; i < 4; i++ )
			code += numbers.charAt( Math.floor( Math.random() * numbers.length ) );
		
		return code;
	}
}

export class UserList {
	users: { [ key: string ]: User } = {};
	
	register( socketId: string, name: string ) {
		const user             = new User( name );
		this.users[ socketId ] = user;
	}
	
	update( socketId: string, user: User ) {
		this.users[ socketId ] = Object.assign( this.users[ socketId ], user );
	}
	
	get( socketId: string ): User {
		return this.users[ socketId ];
	}
}