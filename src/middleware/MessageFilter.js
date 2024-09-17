const Filter = require('bad-words')
const filter = new Filter()
filter.addWords('cặc', 'lồn', 'vú', 'dú', 'đít', 'địt', 'sex', 'dâm', 'chim', 'x', 'lưỡi', 'qh', 'răm', 'zam')

const filterMessage = (message) => {
  return cleanMessage =  filter.clean(message)
}
module.exports = filterMessage
