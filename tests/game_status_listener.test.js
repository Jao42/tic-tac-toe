const path = require('path')
getSrcFile = (file) => path.join('../src', file)

const { gameStatusListener } = require(getSrcFile('gameStatusListener'))

test('default', () => {
  expect(gameStatusListener([0, 1, 2], [3, 4], [0, 1, 2, 3, 4])).toBe(2)
})

