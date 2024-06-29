const { Link } = ReactRouterDOM

import { MailPreview } from '../cmps/MailPreview.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailAside } from '../cmps/MailAside.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { MailDetails } from './MailDetails.jsx'
import { MailCompose } from './MailCompose.jsx'
import { mailService } from '../services/mail.service.js'
const { useState, useEffect } = React

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [isCompose, setIsCompose] = useState(false)

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

  // Function to toggle compose mode on
  function onCompose() {
    setIsCompose(true)
  }

  // Function to toggle compose mode off
  function onCancelCompose() {
    setIsCompose(false)
  }
  function onSelectMailId(mailId) {
    setSelectedMailId(mailId)
  }
  if (!mails) return <div>Loading...</div>

  return (
    <section className='mail-index'>
      {selectedMailId ? (
        <MailDetails mailId={selectedMailId} onBack={handleBackClick} />
      ) : (
        <React.Fragment>
          <MailHeader filterBy={filterBy} onSetFilter={onSetFilter} />
          <MailAside
            mails={mails}
            onCompose={onCompose}
            onCancelCompose={onCancelCompose}
            isCompose={isCompose}
            onAddMail={onAddMail}
            setIsCompose={setIsCompose}
          />

          {isCompose ? (
            <MailCompose
              mails={mails}
              onAddMail={onAddMail}
              onCancelEdit={onCancelCompose} // Uses onCancelCompose to toggle compose mode off
            />
          ) : (
            <MailList
              mails={mails}
              onMailClick={handleMailClick}
              onRemoveMail={onRemoveMail}
            />
          )}
          {/* <section className='add-ons'>
            <h1>Add-ons</h1>
          </section> */}
        </React.Fragment>
      )}
    </section>
  )
}
