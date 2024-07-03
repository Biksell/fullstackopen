const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
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
  const listWithTiedBlogs = [
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
      likes: 2,
      __v: 0
    },
  ]
  const emptyList = []

  test('when list has only one blog, equals only author with one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {author: "A", blogs: 1})
  })
  test('when list has multiple blogs, equals the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {author: "B", blogs: 2})
  })
  test('when list has multiple tied blog counts, equals last unique author added', () => {
    const result = listHelper.mostBlogs(listWithTiedBlogs)
    assert.deepStrictEqual(result, {author: "B", blogs: 2})
  })
  test('when list has no blogs, equals 0', () => {
    const result = listHelper.mostBlogs(emptyList)
    assert.deepStrictEqual(result, "Empty list")
  })
})
