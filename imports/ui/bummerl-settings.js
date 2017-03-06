import { mwcMixin } from 'meteor/mwc:mixin'
import './bummerl-settings.html'
import { restoreSpecialGames } from '../api/utils'
import { SpecialGames } from '../client/startup'

Polymer({
  is: 'bummerl-settings',
  properties: {
    // gameName: String,
    // gamePoints: Number,
    gameId: String,
  },
  behaviors: [mwcMixin],
  getMeteorData: function getSpecialGames() {
    return {
      specialGames: SpecialGames.find({}, { sort: { specialGamePoints: 1 } }).fetch(),
    }
  },
  newGame: (event) => {
    event.preventDefault()
    document.querySelector('#settingsModalContainer').gameName = ''
    document.querySelector('#settingsModalContainer').gameId = ''
    document.querySelector('#settingsModalContainer').gamePoints = 0
    document.querySelector('#settingsModal').open()
  },
  editGame: (event) => {
    // this.set('gameName', e.model.item.specialGameName)
    // this.set('gamePoints', parseInt(e.model.item.specialGamePoints))
    document.querySelector('#settingsModalContainer').gameId = event.model.item._id
    document.querySelector('#settingsModalContainer').gameName = event.model.item.specialGameName
    document.querySelector('#settingsModalContainer').gamePoints = parseInt(event.model.item.specialGamePoints, 10)
    document.querySelector('#settingsModal').open()
  },
  removeGame: (event) => {
    event.preventDefault()
    SpecialGames.remove({ _id: event.currentTarget.id })
  },
  resetSettings: (event) => {
    event.preventDefault()
    restoreSpecialGames()
  },
})
