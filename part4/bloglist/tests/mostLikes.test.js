const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
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
      author: 'B',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 2,
      __v: 0
    },
  ]
  const listWithTiedLikes = [
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
      author: 'B',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Blog #4',
      author: 'A',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 48,
      __v: 0
    },
  ]
  const emptyList = []

  test('when list has only one blog, equals like count of that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {author: "A", likes: 5})
  })
  test('when list has multiple blogs, equals the author with most likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {author: "B", likes: 53})
  })
  test('when list has multiple tied likes counts, equals last unique author added', () => {
    const result = listHelper.mostLikes(listWithTiedLikes)
    assert.deepStrictEqual(result, {author: "B", likes: 53})
  })
  test('when list has no blogs, equals 0', () => {
    const result = listHelper.mostLikes(emptyList)
    assert.deepStrictEqual(result, "Empty list")
  })
})
