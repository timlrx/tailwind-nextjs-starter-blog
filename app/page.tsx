'use client'
import Greetings from '@/components/Greetings'

export default function Home() {
  return (
    <>
      <Greetings />
      {/*  */}
      <br />
      Yi NextChat 🤸
      <iframe
        title="agent"
        src="https://nextchat.hansking.cn/"
        height="500px"
        width="100%"
      ></iframe>
      <br />
      Hans Gallery 🌇
      <iframe
        title="agent"
        src="https://gallery.hansking.cn/grid"
        height="500px"
        width="100%"
      ></iframe>
      <br />
      <a target="_blank" href="https://github.com/HansKing98/bob-plugin-yi-translate">
        Yi Translator for Bob 👽
      </a>
      <img
        src="http://image.hansking.cn/picgo/%E6%88%AA%E5%B1%8F2024-03-20%2015.02.20.png"
        alt=""
      />
    </>
  )
}
