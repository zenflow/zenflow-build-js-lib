function flatmap(array, fn) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    result = result.concat(fn(array[i], i, array))
  }
  return result
}

function repeat(element, times) {
  const result = []
  for (let i = 0; i < times; i++) {
    result.push(element)
  }
  return result
}

module.exports = {
  flatmap,
  repeat,
}
