const { Link } = ReactRouterDOM

import { MailPreview } from '../cmps/MailPreview.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailDetails } from './MailDetails.jsx'
import { MailCompose } from './MailCompose.jsx'
import { mailService } from '../services/mail.service.js'
const { useState, useEffect } = React

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [isCompose, setIsCompose] = useState(false)
  // const [filterBy, setFilterBy] = useState({})
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
  const [selectedMailId, setSelectedMailId] = useState(null) // Car Details

  useEffect(() => {
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
      .then((mails) => setMails(mails))
      .catch((err) => console.log('err ', err))
  }

  function onSetFilter(filterBy) {
    setFilterBy({ ...filterBy })
  }

  function onSetFilterBy(newFilter) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilter }))
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

  function onAddMail(mailToSave) {
    if (!mailToSave.to || !mailToSave.subject) return
    mailService.save(mailToSave).then((savedMail) => {
      setIsCompose(false)
      setMails((prevMails) => [savedMail, ...prevMails])
    })
  }
  // const { from, subject, body } = filterBy
  if (!mails) return <div>Loading...</div>

  function onSelectMailId(mailId) {
    setSelectedMailId(mailId)
  }

  return (
    <section className='mail-index'>
      {selectedMailId ? (
        <MailDetails mailId={selectedMailId} onBack={handleBackClick} />
      ) : (
        <React.Fragment>
          <div>mail app</div>
          <button className='compose-btn' onClick={() => setIsCompose(true)}>
            Compose
          </button>
          <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
          {/* <MailFilter
            filterBy={filterBy}
            onFilterBy={onSetFilterBy}
            onSetFilter={onSetFilter}
          /> */}
          {isCompose && (
            <MailCompose
              mails={mails}
              onAddMail={onAddMail}
              onCancelEdit={() => setIsCompose(false)}
            />
          )}

          {!isCompose && (
            <MailList
              mails={mails}
              onMailClick={handleMailClick}
              onRemoveMail={onRemoveMail}
            />
          )}
        </React.Fragment>
      )}
    </section>
  )
}
//   {/* Compose Mail */}
//   {isEdit && (
//     <BookEdit onAddBook={onAddBook} onCancelEdit={() => setIsEdit(false)} />
// )}
