import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Markdown from 'react-markdown'
import Spinner from '@freesewing/components/Spinner'

const LatestNews = ({ homepage=false }) => {
  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/freesewing/freesewing/develop/LATEST_DEVELOPER_NEWS.md')
      .then((result) => {
        let n = []
        let a = false
        for (let line of result.data.split('\n')) {
          if (line.slice(0, 5) === '#####') {
            if (a) {
              if (homepage) n.push(a)
              else n.push(a.slice(4))
            }
            a = ''
          }
          a += '\n' + line
        }
        n.push(a)
        if (homepage) setNews(n.slice(0,3))
        else setNews(n)
      })
      .catch((err) => console.log(err))
  }, [])
  const [news, setNews] = useState(false)

  return news ? (
    news.map((a) => (
      <div className={`news-article ${homepage ? 'shadow' : '' }`}>
        <Markdown source={a} />
      </div>
    ))
  ) : (
    <Spinner size="150" />
  )
}

export default LatestNews
