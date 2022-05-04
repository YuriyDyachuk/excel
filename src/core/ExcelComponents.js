import {DomListener} from "./DomListener"

export class ExcelComponents extends DomListener {
    /* Construct */
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.prepare()
    }
    /* -Настраиваем компонент до init- */
    prepare() {}

    /* Вывод шаблона компонента */
    toHTML() {
        return ''
    }

    /* -Фасад pattern- -Уведомляем слушателей про событие event- */
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    /* -Подписываемся на событие event- */
    /* -fn и является слушателем- */
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    /* -Инициализируем компонент- -Добавляем DOM слушателей- */
    init() {
        this.initDOMListeners()
    }

    /* -Чистим слушатели- -Удаляем компонент- */
    destroy() {
        this.removeDOMListeners()
        /* -Отписка от события- */
        this.unsubscribers.forEach(unsub => unsub())
    }
}
