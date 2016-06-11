import './point-modal.html'
import { setupNewBummerl } from '../api/utils.js'

Polymer({
  is: "point-modal",
  behaviors: [mwcMixin],
  getMeteorData: function(){
    return {
      specialGames: SpecialGames.find({}, { sort: { specialGamePoints: 1 } }).fetch()
    }
  },
  savePoints: function(){
    if(!document.querySelector("#gamePlayed").selectedItem.id){
      return
    }
    var gamePoints = SpecialGames.findOne({
      _id: document.querySelector("#gamePlayed").selectedItem.id
    }).specialGamePoints
    var currentGame = Session.get("currentGame")
    if(document.querySelector("#gspritzt").checked){
      gamePoints = gamePoints * 2
    }
    var points = Bummerl.findOne({ gameId: currentGame, team: '' }).points;
    var lastPoints = points[points.length - 1];
    var pointObject = points === undefined ? new Array() : points;
    var targetTeam = "";
    if(Session.equals("currentTeam", "teamA")){
      var pointLine = {
        teamApoints: lastPoints.teamApoints - gamePoints,
        teamBpoints: lastPoints.teamBpoints,
        creationDate: new Date()
      };
      pointObject.push(pointLine);
      if(lastPoints.teamApoints - gamePoints <= 0){
        Bummerl.update({ gameId: currentGame, team: '' }, {
          $set: {
            points: pointObject,
            team: Session.get('currentTeam'),
            modificationDate:new Date()
          } })
        var pointObject = setupNewBummerl();
        Bummerl.insert({
          gameId: currentGame,
          team:'',
          modificationDate: new Date(),
          points: pointObject
        })
      }
      Bummerl.update({ gameId: currentGame, team: ''}, {
        $set: { points: pointObject, team: targetTeam, modificationDate: new Date() }
      })
    }
    else{
      var pointLine = {
        teamApoints: lastPoints.teamApoints,
        teamBpoints: lastPoints.teamBpoints - gamePoints,
        creationDate: new Date()
      };
      pointObject.push(pointLine);
      if(lastPoints.teamBpoints - gamePoints <= 0){
        Bummerl.update({ gameId: currentGame, team:''}, {
          $set: { points: pointObject, team: "teamB", modificationDate: new Date()}
        });
      var pointObject = setupNewBummerl();
        Bummerl.insert({ gameId: currentGame, team: '', modificationDate: new Date(), points: pointObject });
      }
      else{
        Bummerl.update({ gameId: currentGame, team: ''},
          { $set: { points: pointObject, modificationDate: new Date() }
        });
      }
    }
    document.querySelector('#pointModal').close()
  }
});
