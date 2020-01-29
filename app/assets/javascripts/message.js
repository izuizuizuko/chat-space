$(function(){ 
  let last_message_id = $('.chat-main__list__box:last').data("message-id");
  var buildHTML = function(message) {
    if ( message.content && message.image ) {
      var html =`<div class="chat-main__list__box" data-message-id = ${message.id} > 
        <div class="chat-main__list__box__info">
          <div class="chat-main__list__box__info__talker">
              message.user_name 
              </div>
              <div class="chat-main__list__box__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__list__box__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
            <img src="${message.image}" class="lower-message__image" >
          </div>
      </div>` 
    } else if  (message.content) {
      var html = `<div class="chat-main__list__box" data-message-id = ${message.id} >
        <div class="chat-main__list__box__info">
          <div class="chat-main__list__box__info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__list__box__info__date">
                ${message.created_at}
            </div>
          </div>
          <div class="chat-main__list__box__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
      </div>` 
    } else if  (message.image) {
      var html =`<div class="chat-main__list__box" data-message-id = ${message.id} >
        <div class="chat-main__list__box__info">
          <div class="chat-main__list__box__info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__list__box__info__date">
                ${message.created_at}
            </div>
          </div>
          <div class="chat-main__list__box__text"> 
            <img src= "${message.image}"class="lower-message__image" >
          </div>
      </div>`
    };
    return html;
  };


  $('#new_message').submit(function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-main__list').append(html);  
        $('.chat-main__list').animate({ scrollTop: $('.chat-main__list')[0].scrollHeight});    
        $('form')[0].reset();
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
    return false;
  })


  var reloadMessages = function() {
    last_message_id = $('.chat-main__list__box:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });

        $('.chat-main__list').append(insertHTML);
        $('.chat-main__list').animate({ scrollTop: $('.chat-main__list')[0].scrollHeight},);
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      alert('error');
    });
  };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 2000);
    }
});

