/// <reference path="common.d.ts" />

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

    get empty() {
        return !this.element;
    }
}

/**
 * @description 메인
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromMain(element, visible) {
    return MyElement.create(element)
        .up("div", ["flex", "space-x-1"])
        .up("div", ["flex", "mb-2"])
        .change(element => {
            if (visible) {
                element.style.visibility = "visible";
                element.nextSibling.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
                element.nextSibling.style.visibility = "hidden";
            }
        });
}

/**
 * @description 커뮤니티 > 목록
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromCommunity1(element, visible) {
    return MyElement.create(element)
        .up("div", ["flex", "gap-x-1"])
        .up("div", ["flex", "flex-col"])
        .change(element => {
            if (visible) {
                element.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
            }
        });
}

/**
 * @description 커뮤니티 게시글 > 댓글
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromCommunity2(element, visible) {
    return MyElement.create(element)
        .up("div", ["flex", "flex-1"])
        .up("div", ["flex", "space-x-2"])
        .change(element => {
            if (visible) {
                element.style.visibility = "visible";
                element.nextSibling.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
                element.nextSibling.style.visibility = "hidden";
            }
        });
}

/**
 * @description 커뮤니티 게시글 > 목록
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromCommunity3(element, visible) {
    return MyElement.create(element)
        .up("div", ["flex", "gap-x-0.5"])
        .up("div", ["px-1"])
        .up("div", ["flex", "w-full"])
        .change(element => {
            if (visible) {
                element.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
            }
        });
}

/**
 * @description Q&A > 목록
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromQnA1(element, visible) {
    return MyElement.create(element)
        .up("div", ["flex", "gap-x-1"])
        .up("div", ["flex", "items-center"])
        .up("div", ["flex", "w-full"])
        .up("div", ["flex", "gap-x-4"])
        .change(element => {
            if (visible) {
                element.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
            }
        });
}

/**
 * @description Q&A 게시글 > 댓글
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromQnA2(element, visible) {
    return MyElement.create(element)
        .up("div", ["flex", "gap-x-2.5"])
        .up("div", ["flex-1"])
        .up("div", ["flex", "gap-x-2.5"])
        .change(element => {
            if (visible) {
                element.style.visibility = "visible";
                element.nextSibling.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
                element.nextSibling.style.visibility = "hidden";
            }
        });
}

/**
 * @description Q&A 게시글 > 댓글 > 댓글
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromQnA3(element, visible) {
    return MyElement.create(element)
        .up("div", ["shrink-0"])
        .up("div", ["flex", "flex-1"])
        .up("div", ["flex", "items-center"])
        .up("li", ["pt-1.5", "pb-0.5"])
        .change(element => {
            if (visible) {
                element.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
            }
        });
}

/**
 * @description Q&A 게시글 > 목록
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromQnA4(element, visible) {
    return MyElement.create(element)
        .up("div", ["flex", "gap-x-0.5"])
        .up("div", ["px-1"])
        .up("div", ["flex", "w-full"])
        .change(element => {
            if (visible) {
                element.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
            }
        });
}

/**
 * @description 지식 게시글 > 목록
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromKnowledge(element, visible) {
    return MyElement.create(element)
        .up("p", ["flex", "items-center"])
        .up("div", ["text-sm/6"])
        .up("div", ["flex", "items-center"])
        .up("div", [])
        .up("div", ["flex", "gap-4", "sm:gap-8"])
        .change(element => {
            if (visible) {
                element.style.visibility = "visible";
            } else {
                element.style.visibility = "hidden";
            }
        });
}

const changes = [
    changeFromMain,

    changeFromCommunity1,
    changeFromCommunity2,
    changeFromCommunity3,

    changeFromQnA1,
    changeFromQnA2,
    changeFromQnA3,
    changeFromQnA4,

    changeFromKnowledge,
];

/** @type {Inflammations} */
const inflammations1 = [
    { id: "105708", active: true }, // 케티
];

/** @type {Inflammations} */
let inflammations2 = inflammations1;

function execute() {
    const inflammations3 = inflammations2.filter(inflammation => inflammation.active);

    /** @type {HTMLAnchorElement[]} */
    const anchors = Array.from(document.querySelectorAll("a[href^='/users/']")).filter(anchor => anchor.textContent.trim() != "");

    inflammations3.forEach(inflammation => {
        anchors.forEach(anchor => {
            if (anchor.href.endsWith(`/users/${inflammation.id}`)) {
                if (anchor.classList.contains("inflammation")) {
                    return;
                }
                anchor.classList.add("inflammation");

                for (const change of changes) {
                    if (change(anchor, false)) {
                        break;
                    }
                }
            }
        });
    });

    anchors.forEach(anchor => {
        if (inflammations3.findIndex(inflammation => anchor.href.endsWith(`/users/${inflammation.id}`)) >= 0) {
            return;
        }

        if (!anchor.classList.contains("inflammation")) {
            return;
        }
        anchor.classList.remove("inflammation");

        for (const change of changes) {
            if (change(anchor, true)) {
                break;
            }
        }
    });
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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message && (message.type == "set-inflammations") && Array.isArray(message.inflammations)) {
        inflammations2 = [...inflammations1, ...message.inflammations];

        sendResponse({ result: true });
    }
});

document.addEventListener("focusin", event => {
    const anchor = getAnchor(event.target);
    if (anchor) {
        chrome.runtime.sendMessage({ type: "check-inflammation", path: anchor.href, text: anchor.textContent.trim() }, response => {
            if (chrome.runtime.lastError || !response) {
                logger.warn("check-inflammation error: " + JSON.stringify(chrome.runtime.lastError));
            }
        });
    }
});

chrome.runtime.sendMessage({ type: "get-inflammations" }, response => {
    if (response && Array.isArray(response.inflammations)) {
        inflammations2 = [...inflammations1, ...response.inflammations];
    }
});

setInterval(() => {
    execute();
}, 10);
execute();
