import { FlowRouter } from 'meteor/kadira:flow-router'
import { mwcLayout } from 'meteor/mwc:layout'
import { Session } from 'meteor/session'
import { GameHistory } from './startup'

FlowRouter.wait()
document.addEventListener('WebComponentsReady', () => {
  FlowRouter.initialize({
  })
})
FlowRouter.route('/', {
  action: () => {
    Session.set('limit', 1)
    if (Session.get('currentGame') === undefined) {
      const lastGame = GameHistory.find({ creationUser: Session.get('appId') }, { limit: Session.get('limit'), sort: { creationDate: -1 } }).fetch()[0]
      if (lastGame !== undefined) {
        Session.setPersistent('currentGame', lastGame._id)
      }
    }
    mwcLayout.render('main-layout', { main: 'bummerl-liste' }, true)
  },
  name: 'Aktuelles Spiel',
})
FlowRouter.route('/gameHistory', {
  action: () => {
    Session.set('limit', 20)
    mwcLayout.render('main-layout', { main: 'game-history' }, true)
  },
  name: 'Alle Spiele',
})
FlowRouter.route('/bummerlSettings', {
  action: () => {
    mwcLayout.render('main-layout', { main: 'bummerl-settings' }, true)
  },
  name: 'Einstellungen',
})
