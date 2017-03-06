import { FlowRouter } from 'meteor/kadira:flow-router'
import './drawer-menu.html'

Polymer({
  is: 'drawer-menu',
  changePage: (event) => {
    event.preventDefault()
    // console.log(e.target.textContent.trim())
    FlowRouter.go(event.target.textContent.trim())
    document.querySelector('app-drawer').toggle()
  },
})
