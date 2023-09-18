const listHelper = require('../utils/list_helper')

const emptyList = []
const listWithOne = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithMany = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Golang rules',
    author: 'Google',
    url: 'https://go.dev',
    likes: 6,
    __v: 0
  },
  {
    _id: '5a422aa71b54a673334d17f8',
    title: 'It is what it is',
    author: 'Karel Parkkola',
    url: 'https://www.huone105.com',
    likes: 15,
    __v: 0
  },
  {
    _id: '5a4254671b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Karel Parkkola',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa40384a676234d17f8',
    title: 'Dart is great!',
    author: 'Dart team',
    url: 'https://dart.dev',
    likes: 7,
    __v: 0
  }
]

describe('total likes', () => {
  test('empty list is zero', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOne)).toBe(5)
  })
  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(listWithMany)).toBe(33)
  })
})

describe('favorite blog', () => {
  test('of empty list is error', () => {
    expect(() => {
      listHelper.favoriteBlog(emptyList)
    }).toThrow()
  })
  test('when list has only one blog equalt to that', () => {
    const result = listHelper.favoriteBlog(listWithOne)
    expect(result).toEqual(listWithOne[0])
  })
  test('of a bigger list to be correct', () => {
    const result = listHelper.favoriteBlog(listWithMany)
    expect(result).toEqual(listWithMany[1])
  })
})

describe('most blogs', () => {
  test('of empty list throws an error', () => {
    expect(() => {
      listHelper.mostBlogs(emptyList)
    }).toThrow()
  })
  test('when list has only one blog equal to that', () => {
    const result = listHelper.mostBlogs(listWithOne)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
  test('of a bigger list to be correct', () => {
    const result = listHelper.mostBlogs(listWithMany)
    expect(result).toEqual({
      author: 'Karel Parkkola',
      blogs: 2
    })
  })
})

describe('most likes', () => {
  test('of empty list throws an error', () => {
    expect(() => {
      listHelper.mostLikes(emptyList)
    }).toThrow()
  })
  test('when list has only one blog equal to that', () => {
    const result = listHelper.mostLikes(listWithOne)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
  test('of a bigger list to be correct', () => {
    const result = listHelper.mostLikes(listWithMany)
    expect(result).toEqual({
      author: 'Karel Parkkola',
      likes: 20
    })
  })
})