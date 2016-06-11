import './game-history.html'

Polymer({
  is: "game-history",
  behaviors: [mwcMixin],
  properties: {
    gamesFound: {
      type: Boolean,
      value: false
    }
  },
  getMeteorData: function(){
    var gamesObject = [];
    this.set("gamesFound", GameHistory.find({},{sort:{creationDate:-1}}).count() > 0)
    GameHistory.find({},{sort:{creationDate:-1}}).forEach(function(doc){
      doc.bummerlTeamA = Bummerl.find({gameId:doc._id,team:'teamA'}).fetch()
      doc.bummerlTeamACount = Bummerl.find({gameId:doc._id,team:'teamA'}).count()
      doc.bummerlTeamB = Bummerl.find({gameId:doc._id,team:'teamB'}).fetch()
      doc.bummerlTeamBCount = Bummerl.find({gameId:doc._id,team:'teamB'}).count()
      gamesObject.push(doc)
    })
    return {
      allGames: gamesObject
    }
  },
  openGame: function(e){
    e.preventDefault()
    Session.setPersistent("currentGame",e.currentTarget.id)
    FlowRouter.go("/")
  }
});
