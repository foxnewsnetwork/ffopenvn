this.new = function(req, res){ 
	res.render("artists/new.jade" );
}; // end new
this.destroy = function(req, res){ }; // end destroy
this.create = function(req, res){ }; // end create
this.edit = function(req, res){ 
	res.render("artists/edit.jade");
}; // end edit
this.show = function(req, res){ 
	res.render("artists/show.jade");
}; // end show
this.index = function(req, res){ 
	res.render("artists/index.jade");
}; // end index
this.update = function(req, res){ }; // end update
