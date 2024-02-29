import React, { useState } from "react"
import axios from "axios"
const URLBACK = "https://api.axolo.co/"
const typeformUrl = "https://h7k2b5xbde3.typeform.com/to/dHRjWDvK#email="

const EnterpriseEmailInput = ({ source }) => {
  const [email, setEmail] = useState("")
  const [submitted, setsubmitted] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()
    if (submitted) {
      setsubmitted(!submitted)
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please provide a valid email")
      return
    }
    window.open(`${typeformUrl}${email}`, "_blank")
    axios.post(`${URLBACK}webhooks/email?enterprise=true&source=${source}`, {
      email,
    })
    setsubmitted(!submitted)
  }

  return (
    <form action="#" className="sm:mx-auto sm:max-w-xl ">
      <div className="sm:flex">
        <div className="min-w-0 flex-1 self-center">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          {submitted ? (
            <p className="self-center text-xs text-gray-800 dark:text-gray-50">Thank you.</p>
          ) : (
            <input
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Enter your email"
              className="block w-full rounded-md border-gray-500 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
            />
          )}
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <button
            onClick={subscribe}
            className="block w-full rounded-md bg-primaryBlue py-3 px-4 font-medium text-white shadow hover:bg-hoverPrimary focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            {submitted ? "Invite a colleague" : "Request Axolo for Enterprise"}
          </button>
        </div>
      </div>
      {/* <p className="mt-3 text-sm text-gray-300 sm:mt-4">
        Someone will answer shortly.
      </p> */}
    </form>
  )
}

export default EnterpriseEmailInput
