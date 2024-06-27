// import { AddBook } from '../cmps/AddBook.jsx'
import { mailService } from '../services/mail.service.js'
// import { showErrorMsg } from '../services/event-bus.service.js'
// import { showSuccessMsg } from '../services/event-bus.service.js'

const { useParams, useNavigate } = ReactRouter

const { useState, useEffect } = React

export function MailCompose({ onAddMail, onCancelEdit }) {
  const [mail, setMail] = useState(mailService.getEmptyMail())
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!params.mailId) return
    mailService.get(params.mailId).then(setMail)
  }, [])

  function onSave(ev) {
    ev.preventDefault()
    mailService
      .save(mail)
      .then(() => showSuccessMsg('mail has successfully saved!'))
      .catch(() => showErrorMsg(`couldn't save mail`))
      .finally(() => navigate('/mail'))
  }

  function handleChange({ target }) {
    const { type, name: prop } = target
    let { value } = target

    switch (type) {
      case 'range':
      case 'number':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setMail((prevMail) => ({ ...prevMail, [prop]: value }))
  }

  function handleChangesubject({ target }) {
    const { type, name: prop } = target
    let { value } = target

    switch (type) {
      case 'range':
      case 'number':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }

    setMail((prevMail) => ({
      ...prevMail,
      subject: { ...prevMail.subject, [prop]: value },
    }))
  }
  //   {
  //     id: 'e106',
  //     createdAt: 1564093930500,
  //     subject: 'Weekly Update',
  //     body: 'Here is your weekly update. Lots of progress made on the current projects!',
  //     bodySummary: 'Here is your weekly update. Lots of',
  //     isRead: true,
  //     sentAt: 1564180330500,
  //     removedAt: null,
  //     from: 'john@workInc.com',
  //     to: 'user@appsus.com',
  //     labels: ['business', 'important'],
  //     isStarred: false,
  //     txt: 'john user',
  //     status: 'inbox',
  //     fromName: 'john',
  //     toName: 'user',
  //     fromSuffix: 'workInc'
  //   },
  const { to, from, subject, body, sentAt } = mail

  return (
    <section className='mail-edit'>
      <h2>Add mail</h2>
      {/* <AddMail /> */}
      Add a mail manually:
      <form onSubmit={onSave}>
        <label className='bold-txt' htmlFor='to'>
          to:{' '}
        </label>
        <input
          onChange={handleChange}
          value={to}
          id='to'
          type='text'
          name='to'
        />

        <label className='bold-txt' htmlFor='from'>
          from:{' '}
        </label>
        <input
          onChange={handleChange}
          value={from}
          id='from'
          type='text'
          name='from'
        />

        {/* <label className='bold-txt' htmlFor='price'>
          Price:{' '}
        </label>
        <input
          onChange={handleChangesubject}
          value={subject.amount}
          id='price'
          type='number'
          name='amount'
        /> */}

        <label className='bold-txt' htmlFor='body'>
          body:{' '}
        </label>
        <input
          onChange={handleChange}
          value={body}
          id='body'
          type='text'
          name='body'
        />

        <label className='bold-txt' htmlFor='pages'>
          Number of pages:{' '}
        </label>
        <input
          onChange={handleChange}
          value={sentAt}
          id='pages'
          type='number'
          name='sentAt'
        />

        <label className='bold-txt' htmlFor='isOnSale'>
          On Sale:{' '}
        </label>
        {/* <input
          onChange={handleChangesubject}
          checked={subject.isOnSale}
          id='isOnSale'
          type='checkbox'
          name='isOnSale'
        /> */}

        <button className='save-edit-btn' type='submit'>
          Save ✔
        </button>
        <button className='cancel-edit-btn' onClick={onCancelEdit}>
          Cancel ✖
        </button>
      </form>
    </section>
  )
}

///////////////////////////

// const { useState } = React
// import { bookService } from "../services/book-service.js"

// export function BookEdit({ onAddBook, onCancelEdit }) {
//     const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())

//     function handleChange({ target }) {
//         let { value, name: field } = target
//         switch (field) {
//             case "title":
//                 value = target.value
//                 break
//             case "amount":
//                 value = +target.value || ""
//                 break
//         }
//         setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
//     }

//     function onSaveBook(ev) {
//         ev.preventDefault()
//         onAddBook(bookToEdit)
//     }

//     return (
//         <section className="book-edit">
//             <h2 className="edit-book-header">Edit Book</h2>
//             <div className="book-edit-container">
//                 <form onSubmit={onSaveBook}>
//                     <div className="book-details-info">
//                         <div>
//                             <span className="book-details-info-title">Title:</span>
//                             <input
//                                 type="text"
//                                 placeholder="Enter New Title"
//                                 name="title"
//                                 value={bookToEdit.title}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <span className="book-details-info-title">Price:</span>
//                             <input
//                                 type="number"
//                                 placeholder="Set Price"
//                                 name="amount"
//                                 min="0"
//                                 onChange={handleChange}
//                                 value={bookToEdit.amount}
//                                 required
//                             />
//                         </div>

//                         <div className="book-edit-actions-container">
//                             <button className="save-edit-btn" type="submit">
//                                 Save ✔
//                             </button>
//                             <button className="cancel-edit-btn" onClick={onCancelEdit}>
//                                 Cancel ✖
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </section>
//     )
// }
