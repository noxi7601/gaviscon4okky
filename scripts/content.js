// content.js

class MyElement {
    /**
     * @param {HTMLElement} element
     */
    constructor(element) {
        /** @type {HTMLElement} */
        this.element = element;
    }

    /**
     * @param {HTMLElement} element
     * @returns {MyElement}
     */
    static create(element) {
        return new MyElement(element);
    }

    /**
     * @param {string} tagName
     * @param {string[]} classNames
     * @returns {MyElement}
     */
    up(tagName, classNames) {
        if (this.element) {
            this.element = this.element.parentElement;
            if (this.element) {
                if (this.element.tagName.toLowerCase() == tagName) {
                    for (const className of classNames) {
                        if (!this.element.classList.contains(className)) {
                            this.element = null;

                            break;
                        }
                    }
                } else {
                    this.element = null;
                }
            }
        }

        return this;
    }

    /**
     * @param {(element: HTMLElement) => void} handler
     * @returns {boolean}
     */
    change(handler) {
        if (this.element) {
            handler(this.element);

            return true;
        } else {
            return false
        }
    }
}

/**
 * @description 메인
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function hideFromMain(element) {
    return MyElement.create(element)
        .up("div", ["flex", "space-x-1"])
        .up("div", ["flex", "mb-2"])
        .change(element => {
            element.style.visibility = "hidden";
            element.nextSibling.style.visibility = "hidden";
        });
}

/**
 * @description 커뮤니티 > 목록
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function hideFromCommunity1(element) {
    return MyElement.create(element)
        .up("div", ["flex", "gap-x-1"])
        .up("div", ["flex", "flex-col"])
        .change(element => {
            element.style.visibility = "hidden";
        });
}

/**
 * @description 커뮤니티 게시글 > 댓글
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function hideFromCommunity2(element) {
    return MyElement.create(element)
        .up("div", ["flex", "flex-1"])
        .up("div", ["flex", "space-x-2"])
        .change(element => {
            element.style.visibility = "hidden";
            element.nextSibling.style.visibility = "hidden";
        });
}

/**
 * @description 커뮤니티 게시글 > 목록
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function hideFromCommunity3(element) {
    return MyElement.create(element)
        .up("div", ["flex", "gap-x-0.5"])
        .up("div", ["px-1"])
        .up("div", ["flex", "w-full"])
        .change(element => {
            element.style.visibility = "hidden";
        });
}

/**
 * @description Q&A > 목록
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function hideFromQnA1(element) {
    return MyElement.create(element)
        .up("div", ["flex", "gap-x-1"])
        .up("div", ["flex", "items-center"])
        .up("div", ["flex", "w-full"])
        .up("div", ["flex", "gap-x-4"])
        .change(element => {
            element.style.visibility = "hidden";
        });
}

/**
 * @description Q&A 게시글 > 댓글
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function hideFromQnA2(element) {
    return MyElement.create(element)
        .up("div", ["flex", "gap-x-2.5"])
        .up("div", ["flex-1"])
        .up("div", ["flex", "gap-x-2.5"])
        .change(element => {
            element.style.visibility = "hidden";
            element.nextSibling.style.visibility = "hidden";
        });
}

/**
 * @description Q&A 게시글 > 댓글 > 댓글
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function hideFromQnA3(element) {
    return MyElement.create(element)
        .up("div", ["shrink-0"])
        .up("div", ["flex", "flex-1"])
        .up("div", ["flex", "items-center"])
        .up("li", ["pt-1.5", "pb-0.5"])
        .change(element => {
            element.style.visibility = "hidden";
        });
}

/**
 * @description Q&A 게시글 > 목록
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function hideFromQnA4(element) {
    return MyElement.create(element)
        .up("div", ["flex", "gap-x-0.5"])
        .up("div", ["px-1"])
        .up("div", ["flex", "w-full"])
        .change(element => {
            element.style.visibility = "hidden";
        });
}

const hides = [
    hideFromMain,

    hideFromCommunity1,
    hideFromCommunity2,
    hideFromCommunity3,

    hideFromQnA1,
    hideFromQnA2,
    hideFromQnA3,
    hideFromQnA4,
];

/**
 * @param {string} inflammation
 */
function hideInflammation(inflammation) {
    document.querySelectorAll(`a[href='/users/${inflammation}'`).forEach(element => hides.forEach(hide => hide(element)));
}

let inflammations = [];

function hideInflammations() {
    hideInflammation("105708"); // 케티

    inflammations.forEach(inflammation => hideInflammation(inflammation));
}

/**
 * @param {HTMLElement} element
 * @returns {HTMLAnchorElement | null}
 */
function getAnchor(element) {
    let current = element;
    while (current) {
        if (current.tagName.toLowerCase() == "a") {
            return current;
        }

        current = current.parentElement;
    }

    return null;
}

function start() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message && (message.type == "set-inflammations") && Array.isArray(message.inflammations)) {
            inflammations = message.inflammations;

            sendResponse({ result: true });
        }
    });

    document.addEventListener("focusin", event => {
        const anchor = getAnchor(event.target);
        if (anchor) {
            chrome.runtime.sendMessage({ type: "check-inflammation", path: anchor.href }, response => {
                if (chrome.runtime.lastError || !response) {
                    console.info("check-inflammation error: " + JSON.stringify(chrome.runtime.lastError));
                }
            });
        }
    });

    chrome.runtime.sendMessage({ type: "get-inflammations" }, response => {
        if (response && Array.isArray(response.inflammations)) {
            inflammations = response.inflammations;
        }
    });

    setInterval(() => {
        hideInflammations();
    }, 10);
    hideInflammations();
}
start();
