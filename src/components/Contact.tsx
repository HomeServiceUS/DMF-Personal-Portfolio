import { useState, type FormEvent } from 'react'
import { profile } from '../data'

type Status = 'idle' | 'error' | 'success'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!name.trim() || !emailOk || message.trim().length < 5) {
      setStatus('error')
      return
    }

    // Submit to Netlify Forms when deployed; ignored gracefully in local dev.
    void fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', name, email, message }),
    }).catch(() => {})

    setStatus('success')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <section id="contact" className="section contact">
      <div className="section__head reveal">
        <span className="section__kicker">04 — Contact</span>
        <h2 className="section__title">Let&apos;s build something</h2>
      </div>

      <div className="contact__grid">
        <div className="contact__intro reveal">
          <p>
            Have a project in mind or just want to say hello? Drop me a note and
            I&apos;ll get back to you within a couple of days.
          </p>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <p className="contact__location">{profile.location}</p>
        </div>

        <form
          className="contact__form reveal"
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          noValidate
        >
          <input type="hidden" name="form-name" value="contact" />
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Lovelace"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ada@example.com"
            />
          </label>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project…"
            />
          </label>

          <button className="btn btn--primary btn--block" type="submit">
            Send message
          </button>

          {status === 'error' && (
            <p className="form__note form__note--error" role="alert">
              Please add your name, a valid email, and a short message.
            </p>
          )}
          {status === 'success' && (
            <p className="form__note form__note--success" role="status">
              Thanks! Your message is on its way. ✨
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
