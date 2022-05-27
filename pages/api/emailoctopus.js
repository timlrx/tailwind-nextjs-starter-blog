// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: "Email is required" })
  }

  try {
    const API_URL = process.env.EMAILOCTOPUS_API_URL
    const API_KEY = process.env.EMAILOCTOPUS_API_KEY
    const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID

    const data = { email_address: email, api_key: API_KEY }

    const API_ROUTE = `${API_URL}lists/${LIST_ID}/contacts`

    const response = await fetch(API_ROUTE, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    if (response.status >= 400) {
      return res.status(500).json({ error: `There was an error subscribing to the list.` })
    }

    return res.status(201).json({ error: "" })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
