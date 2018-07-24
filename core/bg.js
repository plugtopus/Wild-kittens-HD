var userId;

chrome['storage']['local'].get(["userId"], function (items) {
    if (items.userId !== undefined) {
        userId = items.userId;
    }
});

function onRuntimeInstalled(details) {
    if (details.reason === "install") {
        onExtensionInstalled(details);
    }
}

chrome['runtime'].onInstalled.addListener(onRuntimeInstalled);