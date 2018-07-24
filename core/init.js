var userId = "";
var secret = "";

chrome['storage'].local.get(["userId", "secret"], function(items) {
    if (items.userId !== undefined) {
        userId = items.userId;
    }
    if (items.secret !== undefined) {
        secret = items.secret;
    }
});

function getQueryParams() {
    var queryStringObject = {
        uid: userId,
        b: "chrome",
        bv: /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1],
        source: 2,
        themeIndex: 400,
        secret: secret
    };
    return $.param(queryStringObject);
}

$(".switch-check").click(function(event) {
    var settings = {};
    var key = $(this).attr("name");
    var value = $(this).prop("checked");

    if (value == true) {
        var selector = ".footer-" + key;
        $(selector).css("visibility", "visible");
    } else {
        var selector = ".footer-" + key;
        $(selector).css("visibility", "hidden");
    }

    chrome.storage.sync.get(["settings"], function(result) {
        result.settings[key] = value;
        chrome.storage.sync.set({
            settings: result.settings
        }, function() {});
    });
});

$(document).ready(function() {
    $(".sidenav").sidenav();

    var index = Math.floor(Math.random() * 20) + 1;

    var bg_img = "/img/" + index + ".jpg";

    $("body").css({
        background: "url(" + bg_img + ") no-repeat center center fixed",
        "background-size": "cover"
    });

    setTimeout(updateDateTime, 100);
});


$("#search").keyup(function(event) {
    var query = $(this).val();

    if (event.which == 13) {
        var url =
            "https://www.google.com/search?q=" +
            query +
            "&" +
            getQueryParams();
        window.location.href = url;
    }
});