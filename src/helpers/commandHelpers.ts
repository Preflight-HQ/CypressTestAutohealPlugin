export function dragAndDrop (elemDrag, elemDrop, doc) {
  if (!elemDrag || !elemDrop) return false

  let pos = elemDrag.getBoundingClientRect()
  let center1X = Math.floor((pos.left + pos.right) / 2)
  let center1Y = Math.floor((pos.top + pos.bottom) / 2)
  pos = elemDrop.getBoundingClientRect()
  let center2X = Math.floor((pos.left + pos.right) / 2)
  let center2Y = Math.floor((pos.top + pos.bottom) / 2)

  fireMouseEvent(doc, 'mousemove', elemDrag, center1X, center1Y)
  fireMouseEvent(doc, 'mouseenter', elemDrag, center1X, center1Y)
  fireMouseEvent(doc, 'mouseover', elemDrag, center1X, center1Y)
  fireMouseEvent(doc, 'mousedown', elemDrag, center1X, center1Y)

  fireMouseEvent(doc, 'dragstart', elemDrag, center1X, center1Y)
  fireMouseEvent(doc, 'drag', elemDrag, center1X, center1Y)
  fireMouseEvent(doc, 'mousemove', elemDrag, center1X, center1Y)
  fireMouseEvent(doc, 'drag', elemDrag, center2X, center2Y)
  fireMouseEvent(doc, 'mousemove', elemDrop, center2X, center2Y)

  fireMouseEvent(doc, 'mouseenter', elemDrop, center2X, center2Y)
  fireMouseEvent(doc, 'dragenter', elemDrop, center2X, center2Y)
  fireMouseEvent(doc, 'mouseover', elemDrop, center2X, center2Y)
  fireMouseEvent(doc, 'dragover', elemDrop, center2X, center2Y)

  fireMouseEvent(doc, 'drop', elemDrop, center2X, center2Y)
  fireMouseEvent(doc, 'dragend', elemDrag, center2X, center2Y)
  fireMouseEvent(doc, 'mouseup', elemDrag, center2X, center2Y)

  return true
}

function fireMouseEvent (doc, type, elem, centerX, centerY) {
  let evt = doc.createEvent('MouseEvents')
  evt.initMouseEvent(
    type,
    true,
    true,
    window,
    1,
    1,
    1,
    centerX,
    centerY,
    false,
    false,
    false,
    false,
    0,
    elem
  )
  elem.dispatchEvent(evt)
}
