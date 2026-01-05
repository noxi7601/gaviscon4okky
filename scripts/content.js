/// <reference path='common.d.ts' />

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
     * @param {HTMLElement} element
     * @param {string} tagName
     * @param {string[]} classNames
     * @returns {boolean}
     */
    check(element, tagName, classNames) {
        if (element.tagName.toLowerCase() == tagName) {
            for (const className of classNames) {
                if (!element.classList.contains(className)) {
                    return false;
                }
            }

            return true;
        } else {
            return false;
        }
    }

    /**
     * @param {string} tagName
     * @param {string[] | string} classNames
     * @param {number} count
     * @returns {MyElement}
     */
    up(tagName, classNames, count = 1) {
        if (this.element) {
            for (let index = 0; index < count; index++) {
                this.element = this.element.parentElement;
                if (!this.element) {
                    break;
                }
            }
        }

        if (this.element) {
            const classNames9 = Array.isArray(classNames) ? classNames : classNames.split(/\s+/);
            if (!this.check(this.element, tagName, classNames9)) {
                this.element = null;
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
        .up('div', 'flex space-x-1')
        .up('div', 'flex mb-2')
        .change(element => {
            if (visible) {
                element.style.visibility = 'visible';
                element.nextSibling.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
                element.nextSibling.style.visibility = 'hidden';
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
        .up('div', 'relative flex flex-col px-2', 3)
        .change(element => {
            if (visible) {
                element.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
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
        .up('div', 'flex items-center space-x-2', 3)
        .change(element => {
            if (visible) {
                element.style.visibility = 'visible';
                element.nextSibling.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
                element.nextSibling.style.visibility = 'hidden';
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
        .up('div', 'flex w-full items-center', 3)
        .change(element => {
            if (visible) {
                element.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
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
        .up('div', 'flex gap-x-4', 4)
        .change(element => {
            if (visible) {
                element.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
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
        .up('div', 'flex items-start justify-between gap-4', 4)
        .change(element => {
            if (visible) {
                element.style.visibility = 'visible';
                element.nextSibling.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
                element.nextSibling.style.visibility = 'hidden';
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
        .up('div', 'flex items-center text-xs sm:text-sm', 4)
        .change(element => {
            if (visible) {
                element.style.visibility = 'visible';
                element.nextSibling.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
                element.nextSibling.style.visibility = 'hidden';
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
        .up('div', 'flex w-full items-center', 3)
        .change(element => {
            if (visible) {
                element.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
            }
        });
}

/**
 * @description 지식 게시글 > 목록
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromKnowledge1(element, visible) {
    return MyElement.create(element)
        .up('div', 'flex gap-4 sm:gap-8', 5)
        .change(element => {
            if (visible) {
                element.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
            }
        });
}

/**
 * @description 지식 게시글 > 댓글
 * @param {HTMLElement} element
 * @param {boolean} visible
 * @returns {boolean}
 */
function changeFromKnowledge2(element, visible) {
    return MyElement.create(element)
        .up('div', 'flex items-center space-x-2', 2)
        .change(element => {
            if (visible) {
                element.style.visibility = 'visible';
            } else {
                element.style.visibility = 'hidden';
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

    changeFromKnowledge1,
    changeFromKnowledge2,
];

/** @type {Inflammations} */
const inflammations1 = [
    { id: '105708', active: true }, // 케티
];

/** @type {Inflammations} */
let inflammations2 = inflammations1;

function execute() {
    const inflammations3 = inflammations2.filter(inflammation => inflammation.active);

    const userChecker = /\/users\/([\d\w]+)(\/.+)?/;
    /**
     * @param {HTMLAnchorElement} element
     * @param {string} id
     * @returns {boolean}
     * */
    const userCheck = (element, id) => {
        const items = userChecker.exec(element.getAttribute('href'));
        return (items != null) && (items.length > 0) && (items[1] == id);
    };
    /** @type {HTMLAnchorElement[]} */
    const users = Array.from(document.querySelectorAll('a[href^="/users/"]')).filter(user => user.textContent.trim() != '');

    inflammations3.forEach(inflammation => {
        users.forEach(user => {
            if (userCheck(user, inflammation.id)) {
                if (user.classList.contains('inflammation')) {
                    return;
                }
                user.classList.add('inflammation');

                for (const change of changes) {
                    if (change(user, false)) {
                        break;
                    }
                }
            }
        });
    });

    users.forEach(user => {
        if (inflammations3.findIndex(inflammation => userCheck(user, inflammation.id)) >= 0) {
            return;
        }

        if (!user.classList.contains('inflammation')) {
            return;
        }
        user.classList.remove('inflammation');

        for (const change of changes) {
            if (change(user, true)) {
                break;
            }
        }
    });
}

function executeLazy() {
    if (executeLazy.flag) {
        return;
    }
    executeLazy.flag = true;
    setTimeout(() => {
        try {
            execute();
        } finally {
            executeLazy.flag = false;
        }
    }, 30);
}
executeLazy.flag = false;

/**
 * @param {HTMLElement} element
 * @returns {HTMLAnchorElement | null}
 */
function getAnchor(element) {
    let current = element;
    while (current) {
        if (current.tagName.toLowerCase() == 'a') {
            return current;
        }

        current = current.parentElement;
    }

    return null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message && (message.type == 'set-inflammations') && Array.isArray(message.inflammations)) {
        inflammations2 = [...inflammations1, ...message.inflammations];
        executeLazy();

        sendResponse({ result: true });
    }
});

document.addEventListener('focusin', event => {
    const anchor = getAnchor(event.target);
    if (anchor) {
        chrome.runtime.sendMessage({ type: 'check-inflammation', path: anchor.href, text: anchor.textContent.trim() }, response => {
            if (chrome.runtime.lastError || !response) {
                logger.warn('check-inflammation error: ' + JSON.stringify(chrome.runtime.lastError));
            }
        });
    }
});

chrome.runtime.sendMessage({ type: 'get-inflammations' }, response => {
    if (response && Array.isArray(response.inflammations)) {
        inflammations2 = [...inflammations1, ...response.inflammations];
    }
});

(new MutationObserver(() => {
    executeLazy();
})).observe(document.body, { childList: true, subtree: true });

executeLazy();
