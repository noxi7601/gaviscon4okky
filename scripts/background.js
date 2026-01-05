/// <reference path='common.d.ts' />

importScripts(['common.js']);

const tabPaths = [ /http(s?)\:\/\/(.+\.)?okky\.kr(\/.*)?/i ];

/** @type {Inflammation} */
const target = {
    id: '',
    name: '',
    active: true,
};

/**
 * @param {Inflammations} inflammations
 */
function setInflammations(inflammations) {
    chrome.tabs.query({ status: 'complete', active: true, currentWindow: true }, tabs => {
        for (const tab of tabs) {
            if (!tab.id) {
                continue;
            }

            if (!tabPaths.some(tabPath => tabPath.test(tab.url))) {
                continue;
            }

            chrome.tabs.sendMessage(tab.id, { type: 'set-inflammations', inflammations: inflammations }, response => {
                if (chrome.runtime.lastError || !response) {
                    logger.warn('set-inflammations error: ' + JSON.stringify(chrome.runtime.lastError));
                }
            });
        }
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'gaviscon',
        title: 'OKKY 염증 제거',
        visible: true,

        contexts: [ 'link' ],
        targetUrlPatterns: [ 'http://okky.kr/*', 'https://okky.kr/*' ],
    });
});

// chrome.runtime.onStartup.addListener(() => {
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == 'get-inflammations') {
        chrome.storage.local.get('inflammations', result => {
            sendResponse({ inflammations: result.inflammations });
        });

        return true; // 비동기 sendResponse
    } else if (message.type == 'check-inflammation') {
        const items = /\/users\/([0-9]+)/.exec(message.path);
        if (items && message.text) {
            target.id = items[1];
            target.name = message.text;
            target.active = true;

            chrome.contextMenus.update('gaviscon', { visible: true });
        } else {
            target.id = '';
            target.name = '';
            target.active = false;

            chrome.contextMenus.update('gaviscon', { visible: false });
        }

        sendResponse({ result: true });
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area == 'local') {
        for (const [ key, { newValue } ] of Object.entries(changes)) {
            if (key == 'inflammations') {
                setInflammations(newValue);

                break;
            }
        }
    }
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
    if (data.menuItemId == 'gaviscon') {
        if (target.id) {
            chrome.storage.local.get('inflammations', result => {
                /** @type {Inflammations} */
                const inflammations = result.inflammations || [];
                if (inflammations.findIndex(inflammation => inflammation.id == target.id) < 0) {
                    inflammations.push({ ...target });
                    chrome.storage.local.set({ inflammations: inflammations }, () => {
                        setInflammations(inflammations);
                    });
                }
            });
        }
    }
});
