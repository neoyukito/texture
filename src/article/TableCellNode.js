import { XMLTextElement } from 'substance'

export default class TableCellNode extends XMLTextElement {
  constructor (...args) {
    super(...args)

    this.rowIdx = -1
    this.colIdx = -1
  }

  get rowspan () {
    return _parseSpan(this.getAttribute('rowspan'))
  }

  get colspan () {
    return _parseSpan(this.getAttribute('colspan'))
  }

  isShadowed () {
    return this.shadowed
  }

  getMasterCell () {
    return this.masterCell
  }
}

TableCellNode.type = 'table-cell'

function _parseSpan (str) {
  let span = parseInt(str, 10)
  if (isFinite(span)) {
    return Math.max(span, 1)
  } else {
    return 1
  }
}
