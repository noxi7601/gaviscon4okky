/// <reference path="./common.d.ts" />

/** @type {Inflammations} */
let inflammations = [];

class InflammationViews {
    /** @type {InflammationView[]} */
    static items = [];

    /**
     * @param {InflammationView} item
     */
    static add(item) {
        this.items.push(item);
    }

    /**
     * @param {InflammationView} item
     */
    static delete(item) {
        const index = this.items.findIndex(item_ => item_ = item);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }
}

class InflammationView {
    /**
     * @param {Inflammation} inflammation
     */
    constructor(inflammation) {
        /** @type {Inflammation} */
        this._inflammation = inflammation;

        /** @type {HTMLDivElement} */
        this._element = document.createElement("div");
        this._element.className = "inflammation";

        /** @type {HTMLInputElement} */
        this._active = document.createElement("input");
        this._active.type = "checkbox";
        this._active.checked = this._inflammation.active;
        this._active.addEventListener("change", this.activeChange.bind(this));

        /** @type {HTMLSpanElement} */
        this._id = document.createElement("span");
        this._id.className = "id";
        this._id.textContent = this._inflammation.id;

        /** @type {HTMLSpanElement} */
        this._name = document.createElement("span");
        this._name.className = "name";
        this._name.textContent = this._inflammation.name;

        /** @type {HTMLButtonElement} */
        this._delete = document.createElement("button");
        this._delete.className = "delete";
        this._delete.textContent = "삭제";
        this._delete.addEventListener("click", this.deleteClick.bind(this));

        this._element.appendChild(this._active);
        this._element.appendChild(this._id);
        this._element.appendChild(this._name);
        this._element.appendChild(this._delete);

        InflammationViews.add(this);
    }

    /**
     * @private
     * @param {Event} event
     */
    activeChange(event) {
        this._inflammation.active = this._active.checked;

        chrome.storage.local.set({ inflammations: inflammations });
    }

    /**
     * @private
     * @param {Event} event
     */
    deleteClick(event) {
        if (confirm("정말 삭제하시겠습니까?")) {
            const index = inflammations.findIndex(inflammation => inflammation == this._inflammation);
            if (index >= 0) {
                inflammations.splice(index, 1);
                chrome.storage.local.set({ inflammations: inflammations });

                this._element.remove();
            }

            InflammationViews.delete(this);
        }
    }

    /**
     * @param {HTMLElement} parent
     */
    join(parent) {
        parent.appendChild(this._element);
    }
}

/** @type {HTMLDivElement} */
const box = document.querySelector("#content > #box");
box.innerHTML = "";

chrome.storage.local.get("inflammations", result => {
    /** @type {Inflammations} */
    inflammations = result.inflammations || [];

    for (const inflammation of inflammations) {
        const view = new InflammationView(inflammation);
        view.join(box);
    }
});
