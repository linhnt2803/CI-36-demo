
components.chat = `
<section class="chat-container">
  <div class="aside-left">
  <div id="list-conversations" class="list-conversations">
  </div>
  <form id="form-add-conversation" class="form-add-conversation">
    <div class="input-wrapper">
      <input
        type="email"
        name="friendEmail"
        id="friend-email-input"
        placeholder="Enter your friend email">
      <div id="friend-email-error" class="message-error"></div>
    </div>
    <div class="input-wrapper">
      <input
        type="text"
        name="title"
        id="title-input"
        placeholder="Conversation title">
      <div id="title-error" class="message-error"></div>
    </div>
    <button
      type="submit"
      id="form-add-conversation-btn"
      class="btn-icon">
      <i class="fas fa-plus"></i>
    </button>
  </form>
  </div>
  <div class="current-conversation">
    <div id="list-messages" class="list-messages">
    </div>
    <form id="form-add-message" class="form-add-message">
      <div class="input-wrapper">
        <input id="message-input" type="text" name="message" placeholder="Enter your message here">
      </div>
      <button id="add-message-btn" type="submit">Send</button>
    </form>
  </div>
  <!-- right -->
  <div class="aside-right">
    <div id="detail-current-conversation" class="detail-current-conversation">
      
    </div>

    <div class="leave-current-conversation">
      <button id="leave-current-conversation-btn" class="btn-icon"><i class="fas fa-minus"></i></button>
    </div>
  </div>
</section>
`
