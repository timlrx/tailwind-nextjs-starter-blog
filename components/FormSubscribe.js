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
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        Subscribe to the newsletter
      </div>
      <form className="flex flex-col sm:flex-row" onSubmit={subscribe}>
        <div>
          <label className="sr-only" htmlFor="email-input">
            Email address
          </label>
          <input
            autoComplete="email"
            className="px-4 py-2 placeholder-gray-500 bg-white border rounded-md appearance-none w-72 border-neutrals-cool-grey-300 text-neutrals-cool-grey-900 dark:bg-black focus:outline-none focus:ring-primary-400 dark:focus:border-primary-600"
            id="email-input"
            name="email"
            placeholder={subscribed ? "You're subscribed !  🎉" : 'Enter your email'}
            ref={inputEl}
            required
            type="email"
            disabled={subscribed}
          />
        </div>
        <div className="flex w-full mt-2 rounded-md shadow-sm sm:mt-0 sm:ml-3">
          <button
            className={`w-full bg-primary-500 dark:bg-primary-500 px-4 py-2 border border-transparent rounded-md font-medium text-white ${
              subscribed ? 'cursor-default' : 'hover:bg-primary-700 dark:hover:bg-primary-400'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:primary-700`}
            type="submit"
            disabled={subscribed}
          >
            {subscribed ? 'Thank you!' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  )
}

export { FormSubscribe }
