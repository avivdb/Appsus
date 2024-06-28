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
      <h2>Filter mails</h2>
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
// export function mailFilter({ onSetFilter, filterBy }) {
//   const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

//   useEffect(() => {
//     onSetFilter(filterByToEdit)
//   }, [filterByToEdit])

//   function handleChange(ev) {
//     const field = ev.target.name
//     const value = ev.target.value
//     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
//   }

//   function onFilter(ev) {
//     ev.preventDefault()
//     onSetFilter(filterByToEdit)
//   }

//   const { from, body } = filterByToEdit

//   return (
//     <React.Fragment>
//       <section className='filter-container'>
//         <div className='filter-inside-container'>
//           <h2 className='filter-header'>Filter mails:</h2>
//           <form className='mails-filter' onSubmit={onFilter}>
//             <div className='filter-section'>
//               <label htmlFor='byFrom'>from:</label>
//               <input
//                 type='text'
//                 id='byFrom'
//                 name='from'
//                 value={from}
//                 onChange={handleChange}
//                 className='input'
//                 placeholder='Search by from...'
//               />
//             </div>

//             <div className='filter-section'>
//               <label htmlFor='byBody'>body:</label>
//               <input
//                 type='number'
//                 id='body'
//                 name='body'
//                 value={body}
//                 onChange={handleChange}
//                 className='input'
//                 placeholder='Search by body'
//               />
//             </div>
//           </form>
//         </div>
//       </section>
//     </React.Fragment>
//   )
// }

// import { mailService } from '../services/mail.service.js'
// import { utilService } from '../../../services/util.service.js'

// const { useEffect, useState, useRef } = React

// export function MailFilter({ filterBy, onFilterBy }) {
//   const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
//   const initialFilterBy = useRef({ ...filterBy })

//   const onSetFilterDebounce = useRef(utilService.debounce(onFilterBy, 500))
//   // const onSetFilterDebounce = utilService.debounce(onFilterBy, 500)

//   useEffect(() => {
//     onSetFilterDebounce.current(filterByToEdit)
//   }, [filterByToEdit])

//   function handleChange({ target }) {
//     const { name, type } = target
//     const value = type === 'number' ? +target.value : target.value
//     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [name]: value }))
//   }

//   function reset() {
//     setFilterByToEdit(initialFilterBy.current)
//   }

//   return (
//     <section className='mails-filter'>
//       <h3>Filter</h3>
//       <input
//         onChange={handleChange}
//         value={filterByToEdit.from}
//         type='text'
//         name='from'
//         placeholder='Insert mail name'
//       />
//       <input
//         onChange={handleChange}
//         value={filterByToEdit.minPrice}
//         type='number'
//         name='minPrice'
//         placeholder='Insert mail price'
//       />
//       <button onClick={reset}>Reset</button>
//     </section>
//   )
// }
