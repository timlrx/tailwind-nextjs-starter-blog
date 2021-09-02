import { useRef, useState } from 'react'

import siteMetadata from '@/data/siteMetadata'

const FormSubscribe = () => {
  const inputEl = useRef(null)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setMessage('Your e-mail adress is invalid or you are already subscribed!')
      return
    }

    inputEl.current.value = ''
    setSubscribed(true)
    setMessage('Successfully! 🎉 You are now subscribed.')
  }

  return (
    <div>
      <form
        className="mt-6 flex flex-col sm:flex-row lg:mt-0 lg:justify-begin"
        onSubmit={subscribe}
      >
        <div>
          <label className="sr-only" htmlFor="email-input">
            Email address
          </label>
          <input
            autoComplete="email"
            className="appearance-none w-full px-4 py-2 border border-neutrals-cool-grey-300 text-base rounded-md text-neutrals-cool-grey-900 bg-white dark:bg-black placeholder-gray-500 focus:outline-none focus:ring-primary-400 dark:focus:border-primary-600 lg:max-w-xs"
            id="email-input"
            name="email"
            placeholder={subscribed ? "You're subscribed !" : 'Enter your email'}
            ref={inputEl}
            required
            type="email"
            disabled={subscribed}
          />
        </div>
        <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
          <button
            className={`w-full bg-primary-500 dark:bg-primary-400 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white ${
              subscribed ? 'cursor-default' : 'hover:bg-primary-700 dark:hover:bg-primary-300'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary-700 sm:w-auto sm:inline-flex`}
            type="submit"
            disabled={subscribed}
          >
            {subscribed ? 'Thank you!' : 'Sign up'}
          </button>
        </div>
      </form>
      <p className="text-sm text-gray-500 dark:text-gray-400 pt-2 flex flex-col sm:flex-row lg:mt-0 lg:justify-begin">
        {message ? message : 'Enter your email address to be notified of new posts'}
      </p>
    </div>
  )
}

export { FormSubscribe }
