import {$} from "../../core/dom";

export function resizeHandler($root, event) {
    const $target = $(event.target)
    // const $parent = $target.$el.parent
    // const $parent = $target.$el.closest('.column')
    const $parent = $target.closest('[data-type="resizable"]')
    const coords = $parent.getCoords();
    const typeResize = $target.data.resize
    const sideProp = typeResize === 'col' ? 'bottom' : 'right'
    let value

    $target.css({
        opacity: 1,
        [sideProp]: '-2000px'
    })

    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

    document.onmousemove = e => {
        if (typeResize === 'col') {
            const delta = e.pageX - coords.right
            value = coords.width + delta
            // $parent.$el.style.width = value + 'px'
            $target.css({right: -delta + 'px'})
        } else {
            const delta = e.pageY - coords.bottom
            value = coords.height + delta
            // $parent.$el.style.height = value + 'px'
            $target.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if (typeResize === 'col') {
            $parent.css({width: value + 'px'})
            cells.forEach(el => el.style.width = value + 'px')
        } else {
            $parent.css({height: value + 'px'})
        }

        $target.css({
            opacity: 0,
            right: 0,
            bottom: 0
        })
    }
}
