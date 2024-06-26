import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
  //   console.log('book')

  const [mails, setMails] = useState(null)
  //   const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
  // const [selectedBookId, setSelectedBook] = useState(null)

  useEffect(() => {
    loadMails()
  }, [])

  function loadMails() {
    mailService
      .query()
      .then((mails) => setMails(mails))
      .catch((err) => console.log('err ', err))
  }

  if (!mails) return <div>Loading...</div>

  return (
    <section className='mail-index'>
      <div>mail app</div>
      <MailList mails={mails} />
    </section>
  )
}
