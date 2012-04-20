/****************************
* Channel Models                           *
*****************************/
var chatchannels = function(){ 
	this.channels = {};
	this.players = {};
	this.channelCount = 0;
	this.FirstOpenChannel;
	this.NextChannelId;
	this.maxPerChannel = 100;
	
	this.ChannelStats = function( channel ){ 
		var statData = { 
			'channelId': channel,
			'population': this.channels[channel].length,
			'people': this.channels[channel],
		};
		return statData;
	}
	
	this.GetChannel = function(player){ 
		var channel = this.players[player]['channelId'];
		return channel;
	}
	
	this.JoinChannel = function(player, channel){ 
		var aChan;
		if( this.players[player] != undefined ){ 
			this.LeaveChannel( player );
		}
		
		if(channel == undefined){
			aChan = this.FirstOpenChannel;
		}
		else{
			aChan = channel;
		}
		
		if( this.channels[aChan] == undefined )
			this.channels[aChan] = [];	
		if( this.channels[aChan].length > maxPerChannel )
			aChan = this.FirstOpenChannel;
		
		this.channels[aChan].push( player );
		this.players[player] = { 'channelId': aChan, 'number': this.channels[aChan].length-1 };
		
		if(this.channels[aChan].length == maxPerChannel){ 
			this.CreateNewChannel();
		}	
	}
	
	this.Initialize = function(){ 
		this.channels[1] = [];
		this.FirstOpenChannel = 1;
		this.NextChannelId = 2;
	}
	
	this.CreateNewChannel = function(){ 
		this.FirstOpenChannel = this.NextChannelId;
		this.channels[this.FirstOpenChannel] = [];
		this.NextChannelId += 1;
	}
	
	this.LeaveChannel = function(player){ 
		if( this.players[player] == undefined )
			return false;
		var channel = this.players[player]['channelId'];
		var number = this.players[player]['number'];
		this.channels[channel].splice( number, 1 );
		this.players[player] = undefined;
		return channel;
	}
}

this.mychannels = new chatchannels();
this.mychannels.Initialize();

