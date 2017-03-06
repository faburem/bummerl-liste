import './settings-modal.html'
import { SpecialGames } from '../client/startup'

Polymer({
  is: 'settings-modal',
  properties: {
    gameName: String,
    gamePoints: Number,
    gameId: String,
  },
  savePoints: (event) => {
    event.preventDefault()
    if (this.gameId) {
      SpecialGames.update({ _id: this.gameId },
        {
          $set: {
            specialGameName: document.querySelector('#gameName').value,
            specialGamePoints: parseInt(document.querySelector('#gamePoints').value, 10),
          },
        },
      )
    } else {
      SpecialGames.insert({
        specialGameName: document.querySelector('#gameName').value,
        specialGamePoints: parseInt(document.querySelector('#gamePoints').value, 10),
      })
    }
    document.querySelector('#settingsModal').close()
  },
})
