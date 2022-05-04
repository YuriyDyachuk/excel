import {$} from "../../core/dom";

import {ExcelComponents} from "../../core/ExcelComponents";

export class Formula extends ExcelComponents {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    init() {
        super.init()
        this.$formula = this.$root.find('#formula')
        this.$on('table:change', $cell => {
            this.$formula.text($cell.text())
        })
        this.$on('table:input', $cell => {
            this.$formula.text($cell.text())
        })
    }

    toHTML() {
        return `
            <div class="formula-info">fx</div>
            <div class="formula-input" id="formula" contenteditable="true" 
            spellcheck="false">
            </div>
        `
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}
