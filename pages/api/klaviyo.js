export default async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const API_KEY = process.env.KLAVIYO_API_KEY
    const LIST_ID = process.env.KLAVIYO_LIST_ID
    const response = await fetch(
      `https://a.klaviyo.com/api/v2/list/${LIST_ID}/subscribe?api_key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // You can add additional params here i.e. SMS, etc.
        // https://developers.klaviyo.com/en/reference/subscribe
        body: JSON.stringify({
          profiles: [{ email: email }],
        }),
      }
    )
    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the list.`,
      })
    }
    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
