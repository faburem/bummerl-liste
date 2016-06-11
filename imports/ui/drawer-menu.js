import './drawer-menu.html'
Polymer({
  is: "drawer-menu",
  changePage: function(e){
    e.preventDefault()
    // console.log(e.target.textContent.trim())
    FlowRouter.go(e.target.textContent.trim())
    document.querySelector('app-drawer').toggle();
  },
});
