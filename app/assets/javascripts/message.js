$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main-chat__message-list__box-upper-info">
            <div class="main-chat__message-list__box-upper-info__person">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__box-upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__message-list__box-text">
            <p class="main-chat__message-list__box-text__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >`
      return html;
    } else {
      var html =
       `<div class="main-chat__message-list__box-upper-info">
            <div class="main-chat__message-list__box-upper-info__person">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__box-upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="main-chat__message-list__box-text">
            <p class="main-chat__message-list__box-text__content">
              ${message.content}
            </p>
          </div>`
      return html;
    };
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
      $('.main-chat__message-list').append(html);
      $('form')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.main-chat__message-form__box__send').attr('disabled',false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});