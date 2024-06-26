// note service
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTE_KEY = 'noteBD'

const gNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]
_createNotes()

export const notesService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter
}

window.bs = notesService

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            // console.log('notes:', notes)

            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regExp.test(note.title))
            }
            if (filterBy.minPrice) {
                notes = notes.filter(note => note.listPrice.amount >= filterBy.minPrice)
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevNoteId(note))
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: '',
        createdAt: '',
        type: '',
        isPinned: false,
        info: {
            title: '',
            txt: '',
            imgUrl: ``,
            videoUrl: '',
            todo: [],
        },
        style: {
            backgroundColor: utilService.getRandomColor(),
        }
    }
}

function getDefaultFilter(filterBy = {}) {
    return { txt: filterBy.txt, type: filterBy.type, createdAt: filterBy.createdAt }
}

function _createNotes() {

    const notes = utilService.loadFromStorage(NOTE_KEY) || []

    if (notes && notes.length) return

    for (let i = 0; i < 20; i++) {
        const note = {
            id: utilService.makeId(),
            createdAt: utilService.getRandomDate('2022-01-01', '2024-06-30'),
            type: '',
            isPinned: false,
            info: {
                title: utilService.makeLorem(5),
                txt: utilService.makeLorem(utilService.getRandomIntInclusive(0, 20)),
                imgUrl: ``,
                todo: [],
            },
            style: {
                backgroundColor: utilService.getRandomColor(),
            }
        }

        notes.push(note)
        // console.log(note)
    }
    utilService.saveToStorage(NOTE_KEY, notes)
}
