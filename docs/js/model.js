// save all datas
const model = {
  conversations: null, // tat ca cuoc hoi thoai nguoi dung tham gia
  currentConversation: null // cuoc hoi thoai nguoi dung dang chon
}

model.saveConversations = function(conversations) {
  model.conversations = conversations
}

model.updateConversation = function(conversation) {
  // 1. if conversation not yet exists in model.conversations >> add to model
  // 2. if conversation already exists in model.conversations >> replace old by new
  let existedIndex = model.conversations.findIndex(function(c) {
    return c.id == conversation.id
  })
  if(existedIndex >= 0) {
    model.conversations[existedIndex] = conversation
  } else {
    model.conversations.unshift(conversation)
  }
}

model.removeConversation = function(conversation) {
  // conversations = [{ id: 1 }, { id: 2 }, { id: 3 }]
  // conversation { id: 2 }
  if(model.conversations) {
    let index = model.conversations.findIndex(function(element) {
      return element.id == conversation.id
    })
    if(index >= 0) {
      model.conversations.splice(index, 1)
    }
  }
}

model.saveCurrentConversation = function(conversation) {
  model.currentConversation = conversation
}

model.isCurrentConversation = function(conversation) {
  return model.currentConversation
    && model.currentConversation.id == conversation.id
}

model.hasMoreConversation = function() {
  return model.conversations.length
}