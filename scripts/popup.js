/// <reference path='common.d.ts' />

/**
 * @typedef {(sender: InflammationView) => void} NotifyEvent
 */

class InflammationView {
    /**
     * @param {Inflammation} data
     */
    constructor(data) {
        /** @type {Inflammation} */
        this._data = data;

        /** @type {HTMLDivElement} */
        this._element = document.createElement('div');
        this._element.className = 'inflammation';

        /** @type {HTMLInputElement} */
        this._active = document.createElement('input');
        this._active.type = 'checkbox';
        this._active.checked = this._data.active;
        this._active.addEventListener('change', this.activeChange.bind(this));

        /** @type {HTMLSpanElement} */
        this._id = document.createElement('span');
        this._id.className = 'id';
        this._id.textContent = this._data.id;

        /** @type {HTMLSpanElement} */
        this._name = document.createElement('span');
        this._name.className = 'name';
        this._name.textContent = this._data.name;

        /** @type {HTMLButtonElement} */
        this._delete = document.createElement('button');
        this._delete.className = 'delete';
        this._delete.textContent = '삭제';
        this._delete.addEventListener('click', this.deleteClick.bind(this));

        /** @type {NotifyEvent | null} */
        this._onChange = null;

        /** @type {NotifyEvent | null} */
        this._onDelete = null;

        this._element.appendChild(this._active);
        this._element.appendChild(this._name);
        this._element.appendChild(this._id);
        this._element.appendChild(this._delete);
    }

    /**
     * @private
     * @param {Event} event
     */
    activeChange(event) {
        this._data.active = this._active.checked;

        if (this._onChange) {
            this._onChange(this);
        }
    }

    /**
     * @private
     * @param {Event} event
     */
    deleteClick(event) {
        if (this._onDelete) {
            this._onDelete(this);
        }
    }

    get data() {
        return this._data;
    }

    get element() {
        return this._element;
    }

    get onChange() {
        return this._onChange;
    }

    set onChange(value) {
        this._onChange = value;
    }

    get onDelete() {
        return this._onDelete;
    }

    set onDelete(value) {
        this._onDelete = value;
    }
}

class InflammationViews {
    /** @type {Inflammations} */
    static datas = [];

    /** @type {HTMLDivElement} */
    static element = null;

    /** @type {InflammationView[]} */
    static items = [];

    /**
     * @param {HTMLElement} parent
     */
    static build(parent) {
        this.element = document.createElement('div');
        this.element.className = 'inflammations';

        for (const data of this.datas) {
            const item = new InflammationView(data);
            item.onChange = this.itemChange.bind(this);
            item.onDelete = this.itemDelete.bind(this);

            this.element.appendChild(item.element);
            this.items.push(item);
        }

        parent.appendChild(this.element);
    }

    /**
     * @private
     * @param {InflammationView} sender
     */
    static itemChange(sender) {
        chrome.storage.local.set({ inflammations: this.datas });
    }

    /**
     * @private
     * @param {InflammationView} sender
     */
    static itemDelete(sender) {
        if (confirm('정말 삭제하시겠습니까?')) {
            let index = this.datas.findIndex(data => data == sender.data);
            if (index >= 0) {
                this.datas.splice(index, 1);
                chrome.storage.local.set({ inflammations: this.datas });
            }

            index = this.items.findIndex(item => item = sender);
            if (index >= 0) {
                this.items.splice(index, 1);
            }
            sender.element.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    /** @type {HTMLDivElement} */
    const content = document.getElementById('content');
    content.innerHTML = '';

    chrome.storage.local.get('inflammations', result => {
        InflammationViews.datas = result.inflammations || [];
        InflammationViews.build(content);
    });
});
