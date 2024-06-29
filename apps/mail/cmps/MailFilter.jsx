import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter }) {
  const [searchText, setSearchText] = useState('')

  function handleChange(ev) {
    setSearchText(ev.target.value)
  }

  function onSubmitSearch(ev) {
    ev.preventDefault()
    onSetFilter({ from: searchText, subject: searchText, body: searchText })
  }
  return (
    <React.Fragment>
      {/* <h2>Filter mails</h2> */}
      <section className='mail-filter'>
        <form className='mail-search' onSubmit={onSubmitSearch}>
          <button className='btn-search' type='submit'></button>
          <input
            type='search'
            id='byFrom'
            value={searchText}
            onChange={handleChange}
            className='input'
            placeholder='Search mail'
          />
          <button className='btn-filteroptions' type='button'></button>
        </form>
      </section>
    </React.Fragment>
  )
}
