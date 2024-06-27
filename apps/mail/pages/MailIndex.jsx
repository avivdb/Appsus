const { Link } = ReactRouterDOM

import { MailPreview } from '../cmps/MailPreview.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from './MailDetails.jsx'
import { MailCompose } from './MailCompose.jsx'
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

  function onRemoveMail(mailId) {
    mailService
      .remove(mailId)
      .then(() => {
        console.log('mail removed')
        console.log(mailId)
        // loadBooks()
        setMails((mails) => mails.filter((mail) => mail.id !== mailId))
        // showSuccessMsg('Book removed successfully')
      })
      .catch(
        (err) => console.log('err ', err)
        // showErrorMsg('Cannot remove book')
      )
  }

  if (!mails) return <div>Loading...</div>

  return (
    <section className='mail-index'>
      {selectedMailId ? (
        <MailDetails mailId={selectedMailId} onBack={handleBackClick} />
      ) : (
        <React.Fragment>
          <div>mail app</div>
          <MailCompose mails={mails} />
          <MailList
            mails={mails}
            onMailClick={handleMailClick}
            onRemoveMail={onRemoveMail}
          />
        </React.Fragment>
      )}
    </section>
  )
}
