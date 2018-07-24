$(document).ready(function () {

    var OSName = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1) {
        OSName = "Windows";
        $("#searchFirstPopup ").css("right", "2%");
    }
    if (OSName == "Windows") {
        chrome['storage'].local.get("keepChangesShown", function (items) {
            if (items.keepChangesShown === true)
                return;

            let jqSFPopup = $("#searchFirstPopup");
            let jqSFOverlay = $("#searchFirstPopupOverlay");

            jqSFPopup.show();
            jqSFOverlay.show();

            jqSFOverlay.click(function () {
                jqSFPopup.hide();
                jqSFOverlay.hide();
            });

            chrome['storage'].local.set({
                keepChangesShown: true
            }, function () {
            });
        });
    }
});