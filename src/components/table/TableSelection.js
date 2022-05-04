export class TableSelection {
    static cellActive = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        $el.focus().addClass(TableSelection.cellActive)
        this.group.push($el)
        this.current = $el
    }

    clear() {
        this.group.forEach(cell => cell.removeClass(TableSelection.cellActive))
        this.group = []
    }

    selectGroup($els = []) {
        this.clear()
        this.group = $els
        this.group.forEach(el => el.addClass(TableSelection.cellActive))
    }
}
