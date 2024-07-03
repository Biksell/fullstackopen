const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite post', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog #1',
      author: 'A',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog #1',
      author: 'A',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog #2',
      author: 'B',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 51,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog #3',
      author: 'C',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 2,
      __v: 0
    },
  ]
  const emptyList = []

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {title: "Blog #1", author: "A", likes: 5})
  })
  test('when list has multiple blogs, equals the likes of all combined', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {title: "Blog #2", author: "B", likes: 51})
  })
  test('when list has no blogs, equals 0', () => {
    const result = listHelper.favoriteBlog(emptyList)
    assert.deepStrictEqual(result, "Empty list")
  })
})
