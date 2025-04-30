// background.js

const tabUrls = [ /http(s?)\:\/\/(.+\.)?okky\.kr(\/.*)?/i ];

/**
 * @param {string[]} inflammations
 */
function sendInflammations(inflammations) {
    chrome.tabs.query({ status: "complete", active: true, currentWindow: true }, (tabs) => {
        for (const tab of tabs) {
            if (!tab.id) {
                continue;
            }

            if (!tabUrls.some(tabUrl => tabUrl.test(tab.url))) {
                continue;
            }

            chrome.tabs.sendMessage(tab.id, { type: "inflammations", inflammations: inflammations }, (response) => {
                if (chrome.runtime.lastError || !response) {
                    console.warn("sendInflammations error: " + JSON.stringify(chrome.runtime.lastError));
                }
            });
        }
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == "getInflammations") {
        chrome.storage.local.get("inflammations", (result) => {
            sendResponse({ inflammations: result.inflammations });
        });

        return true;
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area == "local") {
        for (const [ key, { newValue } ] of Object.entries(changes)) {
            if (key == "inflammations") {
                sendInflammations(newValue);

                break;
            }
        }
    }
});

setInterval(() => {
    chrome.storage.local.get("inflammations", (result) => {
        sendInflammations(result.inflammations);
    });
}, 5000);
