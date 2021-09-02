// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const API_KEY = process.env.BUTTONDOWN_API_KEY
    const buttondownRoute = `${process.env.BUTTONDOWN_API_URL}subscribers`
    console.log('route : ', buttondownRoute)
    const response = await fetch(buttondownRoute, {
      body: JSON.stringify({
        email,
      }),
      headers: {
        Authorization: `Token ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    if (response.status >= 400) {
      return res.status(500).json({ error: `There was an error subscribing to the list.` })
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
