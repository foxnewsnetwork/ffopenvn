/****************************
* Room Models                               *
*****************************/
var gamerooms = function(){ 
	this.rooms = {};
	this.players = {};
	this.roomCount = 0;
	this.FirstOpenRoom;
	this.NextRoomId;
	this.maxPerRoom = 4;
	this.startFlags = {};
	
	this.StartGame = function(room){ 
		if( this.startFlags[room] )
			return false;
		else{
			this.startFlags[room] = true;
			return true;
		}
	}
	
	this.EndGame = function(room){ 
		if( !this.startFlags[room] ){ 
			return false;
		}
		else{ 
			this.startFlags[room] = false;
			return true;
		}
	}
	
	this.RoomStats = function( room ){ 
		var statData = { 
			'roomId': room,
			'population': this.rooms[room].length,
			'people': this.rooms[room],
			'started': this.startFlags[room]
		};
		return statData;
	}
	
	this.GetRoom = function(player){ 
		var room = this.players[player]['roomId'];
		return room;
	}
	
	this.JoinRoom = function(player, room){ 
		var aRoom;
		if( this.players[player] != undefined ){ 
			this.LeaveRoom( player );
		}
		
		if(room == undefined )
			aRoom = this.FirstOpenRoom;
		else
			aRoom = room;
		
		if( this.rooms[aRoom] == undefined ){
			this.rooms[aRoom] = [];	
			this.startFlags[aRoom] = false;
		}
		if(this.rooms[aRoom].length == maxPerRoom)
			aRoom = this.FirstOpenRoom;
			
		this.rooms[aRoom].push( player );
		this.players[player] = { 'roomId': aRoom, 'number': this.rooms[aRoom].length-1 };
		
		if(this.rooms[aRoom].length == maxPerRoom){ 
			this.CreateNewRoom();
		}	
	}
	
	this.Initialize = function(){ 
		this.rooms[1] = [];
		this.FirstOpenRoom = 1;
		this.NextRoomId = 2;
	}
	
	this.CreateNewRoom = function(){ 
		this.FirstOpenRoom = this.NextRoomId;
		this.rooms[this.FirstOpenRoom] = [];
		this.startFlags[this.FirstOpenRoom] = false;
		this.NextRoomId += 1;
	}
	
	this.LeaveRoom = function(player){ 
		if( this.players[player] == undefined )
			return false;
		var room = this.players[player]['roomId'];
		var number = this.players[player]['number'];
		this.rooms[room].splice( number, 1 );
		this.players[player] = undefined;
		if( this.startFlags[room] == false )
			this.FirstOpenRoom = room;
		return room;
	}
}

this.myrooms = new gamerooms();
this.myrooms.Initialize();

