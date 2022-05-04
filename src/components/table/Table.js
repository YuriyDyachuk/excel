import {ExcelComponents} from "../../core/ExcelComponents";
import {$} from "../../core/dom";

import {isCell, isCellSelected, matrix, nextSelector, shouldResize} from "./table.helper_function";
import {TableSelection} from "./TableSelection";
import {createTable} from "./table.template";
import {resizeHandler} from "./table.resize";

export class Table extends ExcelComponents {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        this.selectCell(this.$root.find(`[data-id="0:0"]`))
        this.$on('formula:input', text => {
          this.selection.current.text(text)
        })
        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:change', $cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (isCellSelected(event)) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        const {key} = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()

            const id = this.selection.current.id(true)
            // const $next = this.$root.find(nextSelector(key, id))
            // this.selection.select($next)
            const newId = nextSelector(key, id)
            const $nextCell = this.$root.find(newId);
            if ($nextCell.$el) {
                this.selectCell($nextCell)
            }
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}
