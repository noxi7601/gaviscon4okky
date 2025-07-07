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

chrome.runtime.onInstalled.addListener(() => {
    console.log("runtime.onInstalled");

    chrome.contextMenus.create({
        id: "gaviscon",
        title: "OKKY 염증 제거",
        visible: true,

        contexts: [ "link" ],
        targetUrlPatterns: [ "http://okky.kr/*", "https://okky.kr/*" ],
    });
});

chrome.runtime.onStartup.addListener(() => {
    console.log("runtime.onStartup");
});

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
            chrome.contextMenus.update("gaviscon", { visible: true });
        } else {
            chrome.contextMenus.update("gaviscon", { visible: false });
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

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("contextMenus.onClicked", info, tab);

    if (info.menuItemId == "gaviscon") {
        const items = /https:\/\/okky.kr\/users\/([0-9]+)/.exec(info.linkUrl);
        if (items && items.length > 1) {
            const inflammation = items[1];

            chrome.storage.local.get("inflammations", result => {
                const inflammations = result.inflammations || [];
                if (!inflammations.includes(inflammation)) {
                    inflammations.push(inflammation);
                    chrome.storage.local.set({ inflammations: inflammations }, () => {
                        setInflammations(inflammations);
                    });
                }
            });
        }
    }
});

function start() {
    // setInterval(() => {
    //     chrome.storage.local.get("inflammations", result => {
    //         if (result && Array.isArray(result.inflammations)) {
    //             sendInflammations(result.inflammations);
    //         }
    //     });
    // }, 5000);
}
start();
