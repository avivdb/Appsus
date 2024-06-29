const { useParams, Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
const { useState, useEffect } = React

export function MailDetails({ mailId, onBack }) {
  const [mail, setMail] = useState(null)

  useEffect(() => {
    loadMail()
  }, [mailId])

  function loadMail() {
    mailService.get(mailId).then(setMail)
  }

  if (!mail) return <div>Loading...</div>

  return (
    <div className='mail-details'>
      <button onClick={onBack}>Back</button>
      <h2>{mail.subject}</h2>
      <h3>
        From: {mail.fromName} ({mail.from})
      </h3>
      <h3>
        To: {mail.toName} ({mail.to})
      </h3>
      <p>{mail.body}</p>
      <div>
        <span>Labels: {mail.labels.join(', ')}</span>
      </div>
    </div>
  )
}
