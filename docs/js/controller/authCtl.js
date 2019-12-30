
controller.register = async function(registerInfo) {
  // 1. create user with email + password
  // 2. update user's displayName = firstname + " " + lastname
  // 3. send user an email verification
  let email = registerInfo.email
  let password = registerInfo.password
  let displayName = registerInfo.firstname + registerInfo.lastname
  view.setText('register-error', '')
  view.setText('register-success', '')
  view.disable('register-submit-btn')
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    await firebase.auth().currentUser.updateProfile({
      displayName: displayName
    })
    await firebase.auth().currentUser.sendEmailVerification()
    view.setText('register-success', 'An email verification has been sended to your email address!')
    firebase.auth().signOut()
  } catch(err) {
    view.setText('register-error', err.message)
  }
  view.enable('register-submit-btn')
}

controller.logIn = async function(logInInfo) {
  let email = logInInfo.email
  let password = logInInfo.password
  view.setText('log-in-error', '')
  view.disable('log-in-submit-btn')

  try {
    let result = await firebase.auth().signInWithEmailAndPassword(email, password)
    if(!result.user || !result.user.emailVerified) {
      throw new Error('You must verify email!')
    }
  } catch(err) {
    view.setText('log-in-error', err.message)
    view.enable('log-in-submit-btn')
  }
}
