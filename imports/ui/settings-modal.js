import './settings-modal.html'
Polymer({
  is: "settings-modal",
  properties: {
    gameName: String,
    gamePoints: Number,
    gameId: String,
  },
  savePoints: function(e){
    e.preventDefault()
    if(this.gameId){
      SpecialGames.update({ _id: this.gameId },
        {
          $set: {
            specialGameName: document.querySelector('#gameName').value,
            specialGamePoints: parseInt(document.querySelector('#gamePoints').value)
          }
        }
      )
    }
    else{
      SpecialGames.insert({
        specialGameName: document.querySelector('#gameName').value,
        specialGamePoints: parseInt(document.querySelector('#gamePoints').value)
      })
    }
    document.querySelector("#settingsModal").close()
  }
});
