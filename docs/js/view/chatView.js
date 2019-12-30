
view.showCurrentConversation = function() {
  if(model.currentConversation) {
    let messages = model.currentConversation.messages
    let listMessages = document.getElementById('list-messages')
    listMessages.innerHTML = ""
    
    for(let message of messages) {
      let content = message.content
      let owner = message.owner
      let className = ""
      if(owner == firebase.auth().currentUser.email) {
        className = "message your"
      } else {
        className = "message"
      }

      let html = `
        <div class="${className}">
          <span>${content}</span>
        </div>
      `
      listMessages.innerHTML += html
    }

    listMessages.scrollTop = listMessages.scrollHeight

    // show data of aside-right
    let detailCurrentConversation = document.getElementById('detail-current-conversation')
    detailCurrentConversation.innerHTML = ""
    let users = model.currentConversation.users
    for(let user of users){
      let html = `<div class="user-email">${user}</div>`
      detailCurrentConversation.innerHTML += html
    }

    let createdAt = model.currentConversation.createdAt
    detailCurrentConversation.innerHTML += `<div class="created-at">${createdAt}</div>`

    // leave conversation click handler
    let leaveCurrentConversationBtn = document.getElementById('leave-current-conversation-btn')
    leaveCurrentConversationBtn.onclick = leaveCurrentConversation

    function leaveCurrentConversation(){
      controller.leaveCurrentConversation()
    }
  } else {
    let listMessages = document.getElementById('list-messages')
    let detailCurrentConversation
      = document.getElementById('detail-current-conversation')
    listMessages.innerHTML = ''
    detailCurrentConversation.innerHTML = ''
  }
}

view.showListConversations = function() {
  if(model.conversations) {
    let conversations = model.conversations
    let listConversations = document.getElementById('list-conversations')
    listConversations.innerHTML = ""

    // show list
    for(let conversation of conversations) {
      let title = conversation.title
      let id = conversation.id
      let members = conversation.users.length > 1
        ? `${conversation.users.length} members`
        : `1 member`
      let className = (model.currentConversation
        && model.currentConversation.id == conversation.id)
          ? "conversation current"
          : "conversation"

      let html = `
        <div id="${id}" class="${className}">
          <div class="conversation-title">
            <span>${title}</span>
          </div>
          <div class="conversation-members">
            <span>${members}</span>
          </div>
        </div>
      `
      
      listConversations.innerHTML += html
    }

    // add event click
    for(let conversation of conversations) {
      let id = conversation.id
      let conversationDiv = document.getElementById(id)

      conversationDiv.onclick = conversationClickHandler

      function conversationClickHandler() {
        model.saveCurrentConversation(conversation)
        view.showCurrentConversation()
        view.showListConversations()
      }
    }
  }
}
