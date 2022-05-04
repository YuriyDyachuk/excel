import {capitalize} from "./utils";

export class DomListener {
    constructor($root, listeners = [], name) {
        if (!$root) {
            throw new Error(`Not $root provider for DomListener!`)
        }
        this.$root = $root
        this.name = name
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                const name = this.name || ''
                throw new Error(
                    `Method ${method} is not implemented in ${name} Component`
                )
            }

            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.onDelete(listener, this[method])
        })

        this.listeners.clear();
    }
}

/* -- input => onInput */
function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}
