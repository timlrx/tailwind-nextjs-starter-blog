// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { email } = req.body

  console.log('hello 1')
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const API_KEY = process.env.NEXT_PUBLIC_BUTTONDOWN
    const response = await fetch(`https://api.buttondown.email/v1/subscribers`, {
      body: JSON.stringify({
        email,
      }),
      headers: {
        Authorization: `Token ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const responseMessage = await response.json()

    if (response.status >= 400) {
      return res.status(500).json({ error: responseMessage[0] })
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
