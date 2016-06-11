import './bummerl-settings.html'
import { restoreSpecialGames } from '../api/utils.js'
Polymer({
  is: "bummerl-settings",
  properties: {
    // gameName: String,
    // gamePoints: Number,
    gameId: String,
  },
  behaviors: [mwcMixin],
  getMeteorData: function(){
    return {
      specialGames: SpecialGames.find({},{sort:{specialGamePoints:1}}).fetch()
    }
  },
  newGame: function(e){
    e.preventDefault()
    document.querySelector("#settingsModalContainer").gameName = ""
    document.querySelector("#settingsModalContainer").gameId = ""
    document.querySelector("#settingsModalContainer").gamePoints = 0
    document.querySelector("#settingsModal").open()
  },
  editGame: function(e){
    // this.set('gameName', e.model.item.specialGameName)
    // this.set('gamePoints', parseInt(e.model.item.specialGamePoints))
    document.querySelector("#settingsModalContainer").gameId = e.model.item._id
    document.querySelector("#settingsModalContainer").gameName = e.model.item.specialGameName
    document.querySelector("#settingsModalContainer").gamePoints = parseInt(e.model.item.specialGamePoints)
    document.querySelector("#settingsModal").open()
  },
  removeGame: function(e){
    e.preventDefault()
    SpecialGames.remove({_id:e.currentTarget.id})
  },
  resetSettings: function(e){
    e.preventDefault()
    restoreSpecialGames()
  },
});
