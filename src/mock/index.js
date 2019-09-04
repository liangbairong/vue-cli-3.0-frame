/*
 * @Author: 梁栢荣
 * @Date: 2019-09-04 11:13:20
 * @Description: file content
 */
const Mock = require('mockjs') // 获取mock对象
const Random = Mock.Random // 获取random对象，随机生成各种数据，具体请翻阅文档
const code = 200 // 返回的状态码

// 随机生成文章数据
const postData = req => {
  
  console.log(req) // 请求体，用于获取参数

  let posts = [] // 用于存放文章数据的数组
  
  for (let i = 0; i < 10; i++) {
    let post = {
      title: Random.csentence(10, 25), // 随机生成长度为10-25的标题
      icon: Random.dataImage('250x250', '文章icon'), // 随机生成大小为250x250的图片链接
      author: Random.cname(), // 随机生成名字
      date: Random.date() + ' ' + Random.time() // 随机生成年月日 + 时间
    }

    posts.push(post)
  }
  
  // 返回状态码和文章数据posts
  return {
    code,
    posts
  }
}

// 定义请求链接，类型，还有返回数据
Mock.mock(RegExp(`${process.env.VUE_APP_ROOT}/api/posts.*`) , 'get', postData);