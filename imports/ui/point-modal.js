import { mwcMixin } from 'meteor/mwc:mixin'
import './point-modal.html'
import { setupNewBummerl } from '../api/utils'
import { SpecialGames, Bummerl } from '../client/startup'


Polymer({
  is: 'point-modal',
  behaviors: [mwcMixin],
  getMeteorData: function getSpecialGames() {
    return {
      specialGames: SpecialGames.find({}, { sort: { specialGamePoints: 1 } }).fetch(),
    }
  },
  savePoints: () => {
    if (!document.querySelector('#gamePlayed').selectedItem.id) {
      return
    }
    let gamePoints = SpecialGames.findOne({
      _id: document.querySelector('#gamePlayed').selectedItem.id,
    }).specialGamePoints
    const currentGame = Session.get('currentGame')
    if (document.querySelector('#gspritzt').checked) {
      gamePoints *= 2
    }
    const points = Bummerl.findOne({ gameId: currentGame, team: '' }).points
    const lastPoints = points[points.length - 1]
    let pointObject = points === undefined ? [] : points
    const targetTeam = ''
    if (Session.equals('currentTeam', 'teamA')) {
      const pointLine = {
        teamApoints: lastPoints.teamApoints - gamePoints,
        teamBpoints: lastPoints.teamBpoints,
        creationDate: new Date(),
      }
      pointObject.push(pointLine)
      if (lastPoints.teamApoints - gamePoints <= 0) {
        Bummerl.update({ gameId: currentGame, team: '' }, {
          $set: {
            points: pointObject,
            team: Session.get('currentTeam'),
            modificationDate: new Date(),
          } })
        pointObject = setupNewBummerl()
        Bummerl.insert({
          gameId: currentGame,
          team: '',
          modificationDate: new Date(),
          points: pointObject,
        })
      }
      Bummerl.update({ gameId: currentGame, team: '' }, {
        $set: { points: pointObject, team: targetTeam, modificationDate: new Date() },
      })
    } else {
      const pointLine = {
        teamApoints: lastPoints.teamApoints,
        teamBpoints: lastPoints.teamBpoints - gamePoints,
        creationDate: new Date(),
      }
      pointObject.push(pointLine)
      if (lastPoints.teamBpoints - gamePoints <= 0) {
        Bummerl.update({ gameId: currentGame, team: '' }, {
          $set: { points: pointObject, team: 'teamB', modificationDate: new Date() },
        })
        pointObject = setupNewBummerl()
        Bummerl.insert({ gameId: currentGame, team: '', modificationDate: new Date(), points: pointObject })
      } else {
        Bummerl.update({ gameId: currentGame, team: '' },
          { $set: { points: pointObject, modificationDate: new Date() },
          })
      }
    }
    document.querySelector('#pointModal').close()
  },
})
