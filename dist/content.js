"use strict";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    var _a;
    if (message.action === "getSelection") {
        const selectedText = (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString().trim();
        sendResponse({ text: selectedText });
        return true;
    }
});
