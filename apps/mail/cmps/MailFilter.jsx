const { useState, useEffect } = React

// export function BookFilter({ filterBy, onSetFilter }) {
//   const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

//   useEffect(() => {
//     onSetFilter(filterByToEdit)
//   }, [filterByToEdit])

//   function handleChange({ target }) {
//     const field = target.name
//     let value = target.value

//     switch (target.type) {
//       case 'number':
//       case 'range':
//         value = +value
//         break
//       case 'checkbox':
//         value = target.checked
//         break

//       default:
//         break
//     }
//     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
//   }
//   // function handleChange({ target }) {
//   //   // console.log(target)
//   //   const { value, name: field } = target
//   //   setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
//   // }

//   function handleTitleChange({ target }) {
//     // console.log(filterByToEdit)
//     const { value } = target
//     // console.log(value)
//     setFilterByToEdit((prevFilter) => ({ ...prevFilter, title: value }))
//   }

//   function handleAmountChange() {}
//   function handleAuthorsChange() {}

//   function onSubmitFilter(ev) {
//     ev.preventDefault()
//     onSetFilter(filterByToEdit)
//     // console.log('filterByToEdit', filterByToEdit)
//   }

//   const { title, amount, authors } = filterByToEdit

//   return (
//     <section className='book-filter'>
//       <h2>Filter Books</h2>
//       <form onSubmit={onSubmitFilter}>
//         <label htmlFor='title'>Book Title</label>
//         <input
//           value={title}
//           onChange={handleChange}
//           type='text'
//           name='title'
//           id='title'
//         />
//         <label htmlFor='authors'>Authors</label>
//         <input
//           value={authors}
//           onChange={handleChange}
//           type='text'
//           name='authors'
//           id='authors'
//         />
//         <label htmlFor='amount'>amount</label>
//         <input
//           value={amount || ''}
//           onChange={handleChange}
//           type='number'
//           name='amount'
//           id='amount'
//         />
//         <button>Submit</button>
//       </form>
//     </section>
//   )
// }
