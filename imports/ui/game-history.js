import { mwcMixin } from 'meteor/mwc:mixin'
import { FlowRouter } from 'meteor/kadira:flow-router'

import './game-history.html'
import { GameHistory, Bummerl } from '../client/startup'

Polymer({
  is: 'game-history',
  behaviors: [mwcMixin],
  properties: {
    gamesFound: {
      type: Boolean,
      value: false,
    },
  },
  getMeteorData: function getGameHistory() {
    const gamesObject = []
    this.set('gamesFound', GameHistory.find({}, { sort: { creationDate: -1 } }).count() > 0)
    GameHistory.find({}, { sort: { creationDate: -1 } }).forEach((processDoc) => {
      const doc = processDoc
      doc.bummerlTeamA = Bummerl.find({ gameId: doc._id, team: 'teamA' }).fetch()
      doc.bummerlTeamACount = Bummerl.find({ gameId: doc._id, team: 'teamA' }).count()
      doc.bummerlTeamB = Bummerl.find({ gameId: doc._id, team: 'teamB' }).fetch()
      doc.bummerlTeamBCount = Bummerl.find({ gameId: doc._id, team: 'teamB' }).count()
      gamesObject.push(doc)
    })
    return {
      allGames: gamesObject,
    }
  },
  openGame: (event) => {
    event.preventDefault()
    Session.setPersistent('currentGame', event.currentTarget.id)
    FlowRouter.go('/')
  },
})
