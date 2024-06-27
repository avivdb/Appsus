import { utilService } from "../../../services/util.service.js"

const { useEffect, useState } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
        console.log('filterByToEdit', filterByToEdit)
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
        <input onChange={handleChange} value={filterByToEdit.title} type="text" name='title' placeholder='Search by title' />
        <input onChange={handleChange} value={filterByToEdit.txt} type="text" name='txt' placeholder='Search by txt ' />
        <button onClick={reset}>Reset</button>
    </section>
}
