window.onload = init

function init() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(view.currentComponent == 'register') {
      return
    }
    if(user && user.emailVerified) {
      view.showComponents('chat')
    } else {
      if(view.currentComponent != 'logIn') {
        view.showComponents('register')
      }
    }
  })
}