const filter = []
filter.push('cặc', 'lồn', 'vú', 'dú', 'đít', 'địt', 'sex', 'dâm', 'chim', 'x', 'lưỡi', 'qh', 'răm', 'zam', 'sét', 'bú')

const filterMessage = (message) => {
  const words = message.split(/\s+/);

  const cleanedMessage = words.map((word) => {
    return filter.includes(word.toLowerCase()) ? '***' : word;
  });
  return cleanedMessage.join(' ');
}
module.exports = filterMessage
