import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Markdown from 'react-markdown'
import Spinner from '@freesewing/components/Spinner'

const LatestNews = ({ homepage=false }) => {
  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    axios
      .get(
        'https://raw.githubusercontent.com/freesewing/freesewing/develop/LATEST_DEVELOPER_NEWS.md',
      { cancelToken: source.token },
      ).then((result) => {
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
        if (homepage) setNews(n.slice(0,6))
        else setNews(n)
      })
      .catch((err) => console.log(err))
    return () => source.cancel()
  }, [homepage])
  const [news, setNews] = useState(false)

  return news ? (
    news.map((a, i) => (
      <div className={`news-article ${homepage ? 'shadow' : '' }`} key={`article${i}`}>
        <Markdown>{a}</Markdown>
      </div>
    ))
  ) : (
    <Spinner size="150" />
  )
}

export default LatestNews
