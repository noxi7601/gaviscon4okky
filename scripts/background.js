// background.js

const tabPaths = [ /http(s?)\:\/\/(.+\.)?okky\.kr(\/.*)?/i ];

/**
 * @param {string[]} inflammations
 */
function setInflammations(inflammations) {
    chrome.tabs.query({ status: "complete", active: true, currentWindow: true }, tabs => {
        for (const tab of tabs) {
            if (!tab.id) {
                continue;
            }

            if (!tabPaths.some(tabPath => tabPath.test(tab.url))) {
                continue;
            }

            chrome.tabs.sendMessage(tab.id, { type: "set-inflammations", inflammations: inflammations }, response => {
                if (chrome.runtime.lastError || !response) {
                    console.warn("set-inflammations error: " + JSON.stringify(chrome.runtime.lastError));
                }
            });
        }
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(`message.type: ${message.type}`);

    if (message.type == "get-inflammations") {
        chrome.storage.local.get("inflammations", result => {
            sendResponse({ inflammations: result.inflammations });
        });

        return true;
    } else if (message.type == "check-inflammation") {
        console.log("path: " + message.path);

        const items = /\/users\/([0-9]+)/.exec(message.path);
        if (items) {
            chrome.contextMenus.update("inflammation", { visible: true });
        } else {
            chrome.contextMenus.update("inflammation", { visible: false });
        }

        sendResponse({ result: true });
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area == "local") {
        for (const [ key, { newValue } ] of Object.entries(changes)) {
            if (key == "inflammations") {
                setInflammations(newValue);

                break;
            }
        }
    }
});

function start() {
    chrome.contextMenus.create({
        id: "inflammation",
        title: "OKKY 염증 제거",
        visible: true,

        contexts: [ "link" ],
        targetUrlPatterns: [ "http://okky.kr/*", "https://okky.kr/*" ],
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
        console.log("contextMenus.onClicked", info, tab);
    });

    // setInterval(() => {
    //     chrome.storage.local.get("inflammations", result => {
    //         if (result && Array.isArray(result.inflammations)) {
    //             sendInflammations(result.inflammations);
    //         }
    //     });
    // }, 5000);
}
start();
