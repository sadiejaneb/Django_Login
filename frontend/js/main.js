$.ajaxSetup({
  beforeSend: function beforeSend(xhr, settings) {
    function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i += 1) {
          const cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) === `${name}=`) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }

    if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
      xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
    }
  },
});

$(document)
  .on("click", ".js-toggle-modal", function (e) {
    e.preventDefault();
    console.log("Hello");
    $(".js-modal").toggleClass("hidden");
  })
  .on("click", ".js-submit", function (e) {
    e.preventDefault();

    const title = $(".js-title-text").val().trim();
    const text = $(".js-post-text").val().trim();

    const btn = $(this);
    const postUrl = btn.data("post-url");

    if (!title || !text) {
      alert("Please enter both a title and text to post.");
      return false;
    }
    btn.prop("disabled", true).text("Posting!");

    $.ajax({
      type: "POST",
      url: postUrl,
      data: {
        title: title,
        text: text,
      },
      success: (dataHtml) => {
        $(".js-modal").addClass("hidden");
        $("#posts-container").prepend(dataHtml);
        btn.prop("disabled", false).text("New Post");
        $(".js-title-text").val("");
        $(".js-post-text").val("");
      },
      error: (error) => {
        console.log(error);
        btn.prop("disabled", false).text("Error");
      },
    });
  })
  .on("click", ".js-follow", function (e) {
    e.preventDefault();
    const action = $(this).attr("data-action");

    $.ajax({
      type: "POST",
      url: $(this).data("url"),
      data: {
        action: action,
        username: $(this).data("username"),
      },
      success: (data) => {
        $(".js-follow-text").text(data.wording);
        if (action == "follow") {
          //change wording to unfollow
          $(this).attr("data-action", "unfollow");
        } else {
          //change wording to follow
          $(this).attr("data-action", "follow");
        }
      },
      error: (error) => {
        console.warn(error);
      },
    });
  });
