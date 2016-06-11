import { setupNewBummerl, restoreSpecialGames } from '../api/utils.js'
Meteor.disconnect()
SpecialGames = new Ground.Collection("specialgames", {connection:null});
GameHistory = new Ground.Collection("gamehistory", {connection:null});
Points = new Ground.Collection("points", {connection:null});
Bummerl = new Ground.Collection("bummerl", {connection:null});
Tracker.autorun(function(){
  if (Ground.ready()){
    if(SpecialGames.find({}).count() === 0){
      restoreSpecialGames();
    } else if(SpecialGames.find({specialGameId:"zehnerloch"}).count()>1){
      restoreSpecialGames()
    }
  }
  if(document.querySelector(".title")){
    document.querySelector(".title").innerHTML = FlowRouter.getRouteName()
  }
  if(FlowRouter.getRouteName() === "Aktuelles Spiel"){
    if(document.querySelector('#navMenu')){
      if(document.querySelector('#navMenu') !== 0){
        document.querySelector('#navMenu').selectIndex(0)
      }
    }
  }
  if(FlowRouter.getRouteName() === "Alle Spiele"){
    if(document.querySelector('#navMenu')){
      if(document.querySelector('#navMenu') !== 1){
        document.querySelector('#navMenu').selectIndex(1)
      }
    }
  }
  if(FlowRouter.getRouteName() === "Einstellungen"){
    if(document.querySelector('#navMenu')){
      if(document.querySelector('#navMenu') !== 2){
        document.querySelector('#navMenu').selectIndex(2)
      }
    }
  }
})
if(Session.get("appId")==undefined){
  Session.setPersistent("appId",Random.id());
}
Session.setDefault("limit",1);
