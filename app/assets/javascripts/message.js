$(function(){ 
    function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class=.chat-main__list__box=${message.id}>
          <div class=.chat-main__list__box__info>
            <div class=.chat-main__list__box__info__talker>
              ${message.user_name}
            </div>
            <div class=.chat-main__list__box__info__date>
              ${message.created_at}
            </div>
          </div>
          <div class=chat-main__list__box__text>
            <p class=lower-message__content>
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class=.chat-main__list__box__info=${message.id}>
          <div class="upper-message">
            <div class="chat-main__list__box__info__talker">
              ${message.user_name}
            </div>
            <div class="chat-main__list__box__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="hat-main__list__box__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
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
});
