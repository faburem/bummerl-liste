import { mwcMixin } from 'meteor/mwc:mixin'
import './bummerl-liste.html'
import { setupNewBummerl } from '../api/utils'
import { GameHistory, Bummerl } from '../client/startup'

Polymer({
  is: 'bummerl-liste',
  behaviors: [mwcMixin],
  // observers: ['teamAChanged(mwcData.teamAName)','teamBChanged(mwcData.teamBName)'],
  properties: {
    currentGame: {
      type: Boolean,
      value: false,
    },
  },
  teamAChanged: (event) => {
    GameHistory.update({ _id: Session.get('currentGame') }, { $set: { teamA: event.target.value } })
  },
  teamBChanged: (event) => {
    GameHistory.update({ _id: Session.get('currentGame') }, { $set: { teamB: event.target.value } })
  },
  newGame: (event) => {
    event.preventDefault()
    GameHistory.insert({ teamA: 'Team A', teamB: 'Team B', creationDate: new Date(), creationUser: Session.get('appId') }, (error, result) => {
      Bummerl.insert({ gameId: result, team: '', modificationDate: new Date(), points: setupNewBummerl() })
      Session.setPersistent('currentGame', result)
    })
  },
  addPointsTeamA: (event) => {
    event.preventDefault()
    Session.set('currentTeam', 'teamA')
    document.querySelector('#gspritzt').checked = false
    document.querySelector('#pointModal').open()
  },
  addPointsTeamB: (event) => {
    event.preventDefault()
    Session.set('currentTeam', 'teamB')
    document.querySelector('#gspritzt').checked = false
    document.querySelector('#pointModal').open()
  },
  getMeteorData: function getBummerlData() {
    this.set('currentGame', Session.get('currentGame'))
    return {
      currentPoints: Bummerl.findOne({ gameId: Session.get('currentGame'), team: '' })
        ? Bummerl.findOne({ gameId: Session.get('currentGame'), team: '' }).points : false,
      allPoints: Bummerl.find({ gameId: Session.get('currentGame'), team: { $ne: '' } })
        ? Bummerl.find({ gameId: Session.get('currentGame'), team: { $ne: '' } }).fetch() : false,
      bummerlTeamA: Bummerl.find({ gameId: Session.get('currentGame'), team: 'teamA' }).fetch(),
      bummerlTeamACount: Bummerl.find({ gameId: Session.get('currentGame'), team: 'teamA' }).count(),
      bummerlTeamB: Bummerl.find({ gameId: Session.get('currentGame'), team: 'teamB' }).fetch(),
      bummerlTeamBCount: Bummerl.find({ gameId: Session.get('currentGame'), team: 'teamB' }).count(),
      teamAName: GameHistory.findOne({ _id: Session.get('currentGame') })
        ? GameHistory.findOne({ _id: Session.get('currentGame') }).teamA : false,
      teamBName: GameHistory.findOne({ _id: Session.get('currentGame') })
        ? GameHistory.findOne({ _id: Session.get('currentGame') }).teamB : false,
    }
  },
})
