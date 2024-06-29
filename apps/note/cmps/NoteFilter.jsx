import { utilService } from "../../../services/util.service.js"

const { useEffect, useState } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
        // console.log('filterByToEdit', filterByToEdit)
    }, [filterByToEdit])



    function handleChange({ target }) {
        console.log('target', target)
        const { name: prop } = target
        let { value } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [prop]: value }))
        console.log('target, value:, prop:', target, value, prop)
    }



    function reset() {
        setFilterByToEdit({ title: '', txt: '', type: '' })
    }

    return <section className='note-filter'>
        <input onChange={handleChange} value={filterByToEdit.title} type="text" name='title' placeholder='Search' />
        {/* <input onChange={handleChange} value={filterByToEdit.txt} type="text" name='txt' placeholder='Search by txt ' /> */}

        <button onClick={reset}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>

        </button>
    </section>
}
