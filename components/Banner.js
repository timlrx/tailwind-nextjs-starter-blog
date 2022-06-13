import Link from '@/components/Link'
import { RoughNotation } from 'react-rough-notation'
import AnimatedText from 'react-animated-text-content'
import TextLoop from 'react-text-loop'
import { openPopupWidget } from 'react-calendly'

function Banner() {
  return (
    // <div className='fade-in banner flex flex-1 flex-col justify-center px-6 py-10 dark:text-white lg:px-10'>
    //   <h1 className='text-3xl font-bold dark:text-white lg:text-5xl'>
    //     Hello, welcome to my website! s
    //   </h1>
    //   <p className='my-2 text-lg lg:my-4 lg:text-2xl'>

    //   </p>
    //   <p className='font-light lg:text-xl'>

    //   </p>
    // </div>
    <div className="fade-in banner my-48 flex flex-1 flex-col justify-center px-6 dark:text-white lg:px-10">
      <h1 className="text-3xl font-bold dark:text-white lg:text-5xl">
        <AnimatedText type="words" interval={0.8} duration={1} animationType={'throw'}>
          Shouryan Nikam
        </AnimatedText>
      </h1>
      <p className="my-2 text-lg lg:my-4 lg:text-2xl ">
        <TextLoop delay={1000} interval={2000}>
          <RoughNotation
            show
            type="highlight"
            animationDelay={500}
            animationDuration={500}
            iterations={1}
            color={'#50C878'}
          >
            CS + DS at UMich
          </RoughNotation>
          <RoughNotation
            show
            type="highlight"
            animationDelay={500}
            animationDuration={500}
            iterations={1}
            color={'#50C878'}
          >
            SW Intern at Tektronix
          </RoughNotation>
          <RoughNotation
            show
            type="highlight"
            animationDelay={500}
            animationDuration={500}
            iterations={1}
            color={'#50C878'}
          >
            ❤️ Python and JavaScript
          </RoughNotation>
          <RoughNotation
            show
            type="highlight"
            animationDelay={500}
            animationDuration={500}
            iterations={1}
            color={'#50C878'}
          >
            Interested in Web3
          </RoughNotation>
          <RoughNotation
            show
            type="highlight"
            animationDelay={500}
            animationDuration={500}
            iterations={1}
            color={'#50C878'}
          >
            Graduating Spring 2023
          </RoughNotation>
        </TextLoop>{' '}
      </p>
      <p className="font-light lg:text-xl">
        Read more
        <Link className="ml-2 mr-2 font-normal" href="/about">
          <RoughNotation
            show
            type="box"
            animationDelay={2000}
            animationDuration={1000}
            color={'red'}
          >
            about me
          </RoughNotation>
        </Link>
        or
        <Link className="ml-2 font-normal" href="https://shouryannikam.start.page">
          <RoughNotation
            show
            type="circle"
            animationDelay={2000}
            animationDuration={1200}
            color={'violet'}
          >
            contact me.
          </RoughNotation>
        </Link>
      </p>
    </div>
  )
}

export default Banner
