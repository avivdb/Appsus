import { MailPreview } from '../cmps/MailPreview.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from './MailDetails.jsx'
import { mailService } from '../services/mail.service.js'
const { useState, useEffect } = React

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [selectedMailId, setSelectedMailId] = useState(null)

  useEffect(() => {
    loadMails()
  }, [])

  function loadMails() {
    mailService
      .query()
      .then((mails) => setMails(mails))
      .catch((err) => console.log('err ', err))
  }

  function handleMailClick(mailId) {
    setSelectedMailId(mailId)
  }

  function handleBackClick() {
    setSelectedMailId(null)
  }

  if (!mails) return <div>Loading...</div>

  return (
    <section className='mail-index'>
      {selectedMailId ? (
        <MailDetails mailId={selectedMailId} onBack={handleBackClick} />
      ) : (
        <React.Fragment>
          <div>mail app</div>
          <MailList mails={mails} onMailClick={handleMailClick} />
        </React.Fragment>
      )}
    </section>
  )
}
