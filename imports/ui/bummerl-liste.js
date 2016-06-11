import './bummerl-liste.html'
import { setupNewBummerl } from '../api/utils.js'
Polymer({
  is: "bummerl-liste",
  behaviors: [mwcMixin],
  // observers: ['teamAChanged(mwcData.teamAName)','teamBChanged(mwcData.teamBName)'],
  properties: {
    currentGame: {
      type: Boolean,
      value: false
    }
  },
  teamAChanged: function(e){
    GameHistory.update({ _id: Session.get("currentGame") },{$set:{teamA: e.target.value}});
  },
  teamBChanged: function(e){
    GameHistory.update({ _id: Session.get("currentGame") },{$set:{teamB: e.target.value}});
  },
  newGame: function(e){
    e.preventDefault();
    GameHistory.insert({teamA: "Team A", teamB: "Team B", creationDate: new Date(),creationUser: Session.get("appId")}, function(error,result){
      Bummerl.insert({ gameId: result, team: "", modificationDate: new Date(), points: setupNewBummerl() });
      Session.setPersistent("currentGame", result);
    });
  },
  addPointsTeamA: function(e) {
    e.preventDefault()
    Session.set("currentTeam", "teamA");
    document.querySelector("#gspritzt").checked = false
    document.querySelector('#pointModal').open()
  },
  addPointsTeamB: function(e){
    e.preventDefault()
    Session.set("currentTeam", "teamB")
    document.querySelector("#gspritzt").checked = false
    document.querySelector('#pointModal').open()
  },
  getMeteorData: function(){
    this.set("currentGame", Session.get("currentGame") ? true : false)
    return {
      currentPoints: Bummerl.findOne({ gameId: Session.get("currentGame"), team: '' })
        ? Bummerl.findOne({ gameId: Session.get("currentGame"), team: '' }).points : false,
      allPoints: Bummerl.find({gameId:Session.get("currentGame"),team:{$ne:""}})
        ? Bummerl.find({gameId:Session.get("currentGame"),team:{$ne:""}}).fetch() : false,
      bummerlTeamA: Bummerl.find({gameId:Session.get("currentGame"),team:"teamA"}).fetch(),
      bummerlTeamACount: Bummerl.find({gameId:Session.get("currentGame"),team:"teamA"}).count(),
      bummerlTeamB: Bummerl.find({gameId:Session.get("currentGame"),team:"teamB"}).fetch(),
      bummerlTeamBCount: Bummerl.find({gameId:Session.get("currentGame"),team:"teamB"}).count(),
      teamAName: GameHistory.findOne({ _id:Session.get("currentGame") })
        ? GameHistory.findOne({ _id:Session.get("currentGame") }).teamA : false,
      teamBName: GameHistory.findOne({ _id:Session.get("currentGame") })
        ? GameHistory.findOne({ _id:Session.get("currentGame") }).teamB : false
    }
  }
})
