
controller.loadConversations = async function() {
  // 1. load data from db
  let currentEmail = firebase.auth().currentUser.email
  let result = await firebase
    .firestore()
    .collection('conversations')
    .where('users', 'array-contains', currentEmail)
    .get()
  let docs = result.docs
  let conversations = transformDocs(docs)
  
  // 2. save data to model
  model.saveConversations(conversations)
  if(conversations.length) {
    let currentConversation = conversations[0]
    model.saveCurrentConversation(currentConversation)
  }

  // 3. display data
  view.showCurrentConversation()
  view.showListConversations() // model.conversations >> #list-conversations

  // // TODO: remove the line below
  // demoQueryDatabase()
}

controller.setupDatabaseChange = function() {
  let currentEmail = firebase.auth().currentUser.email
  let isFirstRun = true

  firebase
    .firestore()
    .collection('conversations')
    .where('users', 'array-contains', currentEmail)
    .onSnapshot(function(snapshot) {
      if(isFirstRun) {
        isFirstRun = false
        return
      }
      let docChanges = snapshot.docChanges()
      for(let docChange of docChanges) {
        if(docChange.type == 'modified') {
          let doc = docChange.doc
          let conversation = transformDoc(doc)

          if(model.currentConversation
            && model.currentConversation.id == conversation.id) {
            model.saveCurrentConversation(conversation)
            view.showCurrentConversation()
          }
        }
        if(docChange.type == 'added') {
          let conversation = transformDoc(docChange.doc)
          // add conversation to model.conversations
          model.updateConversation(conversation)
          view.showListConversations()
        }
        if(docChange.type == 'removed') {
          let conversation = transformDoc(docChange.doc)
          
          model.removeConversation(conversation)
          if(model.isCurrentConversation(conversation)) {
            if(model.hasMoreConversation()) {
              model.saveCurrentConversation(model.conversations[0])
            } else {
              model.saveCurrentConversation(null)
            }
          }
          view.showListConversations()
          view.showCurrentConversation()
        }
      }
    })
}

controller.addMessage = async function(message) {
  if(model.currentConversation) {
    let currentId = model.currentConversation.id
    view.disable('add-message-btn')

    await firebase
      .firestore()
      .collection('conversations')
      .doc(currentId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
        // users: firebase.firestore.FieldValue.arrayRemove(email)
      })

      view.enable('add-message-btn')
      document.getElementById('message-input').value = ""
  }
}

controller.addConversation = async function(title, friendEmail) {
  view.disable('form-add-conversation-btn')
  try {
    let currentEmail = firebase.auth().currentUser.email
    let signInMethods = await firebase
      .auth()
      .fetchSignInMethodsForEmail(friendEmail)
    if(!signInMethods.length) {
      throw new Error('Friend email not yet registered!')
    }
    if(friendEmail == currentEmail) {
      throw new Error('Do not enter your email!')
    }

    let conversation = {
      title: title,
      messages: [],
      users: [friendEmail, currentEmail],
      createdAt: new Date().toISOString()
    }
  
    await firebase
      .firestore()
      .collection('conversations')
      .add(conversation)

    document.getElementById('title-input').value = ""
    document.getElementById('friend-email-input').value = ""
  } catch(err) {
    view.setText('title-error', err.message)
  }
  view.enable('form-add-conversation-btn')
}

controller.leaveCurrentConversation = async function() {
  if(model.currentConversation) {
    let docId = model.currentConversation.id
    let currentEmail = firebase.auth().currentUser.email

    await firebase
      .firestore()
      .collection('conversations')
      .doc(docId)
      .update({
        users: firebase.firestore.FieldValue.arrayRemove(currentEmail)
      })
  }
}