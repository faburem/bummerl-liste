FlowRouter.wait();
document.addEventListener("WebComponentsReady", function() {
  FlowRouter.initialize({
  });
});
FlowRouter.route('/', {
  action: function(){
  	Session.set("limit",1);
  	if(Session.get("currentGame")==undefined){
  		var lastGame = GameHistory.find({creationUser:Session.get("appId")},{limit:Session.get("limit"),sort:{creationDate:-1}}).fetch()[0];
  		if(lastGame != undefined){
  			Session.setPersistent("currentGame", lastGame._id);
  		}
  	}
  	// this.layout("bummerlLayout",{data: {title: 'Aktuelles Spiel',styleAddition:'margin-bottom:0;'}});
    mwcLayout.render("main-layout",{"main":"bummerl-liste"}, true);
  },
  name: 'Aktuelles Spiel'
});
FlowRouter.route('/gameHistory', {
  action: function(){
  	Session.set("limit",20);
  	// this.layout("bummerlLayout",{data: {title: 'Alle Spiele'}});
  	// this.render('gamehistory');
    mwcLayout.render("main-layout",{"main":"game-history"}, true);
  },
  name: 'Alle Spiele'
});
FlowRouter.route('/bummerlSettings', {
  action: function(){
  	// this.layout("bummerlLayout",{data: {title: 'Einstellungen'}});
  	// this.render("bummerlSettings");
    mwcLayout.render("main-layout",{"main":"bummerl-settings"}, true);
  },
  name: 'Einstellungen'
});
