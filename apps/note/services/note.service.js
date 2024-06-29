// note service
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTE_KEY = 'noteBD'

const demoData = {
    imgs: [
        "https://placekitten.com/200/300",
        "https://placedog.net/400/300",
        "https://picsum.photos/200/300?random=1",
        "https://loremflickr.com/320/240/bird",
        "https://placebunny.net/300/400",
        "https://picsum.photos/200/300?random=2",
        "https://placeimg.com/640/480/any",
        "https://placebeard.it/400x300",
        "https://placebear.com/400/300",
        "https://loremflickr.com/320/240/cat",
        "https://placecage.com/200/300",
        "https://placeimg.com/640/480/nature",
        "https://placebeard.it/400x300",
        "https://placekitten.com/200/300",
        "https://placebeard.it/400x300",
        "https://placecage.com/200/300",
        "https://placeimg.com/640/480/tech",
        "https://placebeard.it/400x300",
        "https://placebear.com/400/300",
        "https://placecage.com/200/300"
    ],
    videos: [
        "https://www.youtube.com/embed/j5a0jTc9S10",
        "https://www.youtube.com/embed/5qap5aO4i9A",
        "https://www.youtube.com/embed/6JYIGclVQdw",
        "https://www.youtube.com/embed/HDVGq9Rshbs",
        "https://www.youtube.com/embed/SWYqp7iY_Tc",
        "https://www.youtube.com/embed/UJjioy46L_4",
        "https://www.youtube.com/embed/Ifwknpd3Ghs",
        "https://www.youtube.com/embed/Z7Vu6lW9KWg",
        "https://www.youtube.com/embed/M61r86jR4Fc",
        "https://www.youtube.com/embed/7v_JEMpsB8w",
        "https://www.youtube.com/embed/Jk2Iot4w7E4",
        "https://www.youtube.com/embed/vIN4jwRgBdM",
        "https://www.youtube.com/embed/RJdp9-gP2Dk",
        "https://www.youtube.com/embed/UJjioy46L_4",
        "https://www.youtube.com/embed/mIYzpHjGw8o",
        "https://www.youtube.com/embed/RlGJzIMs7_g",
        "https://www.youtube.com/embed/vT2w4Kmz6tk",
        "https://www.youtube.com/embed/4rq8Pof6OfE",
        "https://www.youtube.com/embed/kJQP7kiw5Fk",
        "https://www.youtube.com/embed/3JZ_D3ELwOQ"
    ],
    todos: [
        'buy groceries',
        'swim',
        'complete project report',
        'clean the house',
        'write blog post',
        'study for exam',
        'go for a jog',
        'plan vacation',
        'attend meeting',
        'practice guitar',
        'read book',
        'bake cookies',
        'paint picture',
        'organize files',
        'research new technology',
        'volunteer at shelter',
        'practice yoga',
        'watch movie',
        'visit museum',
        'play video games'
    ]
}

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

            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                notes = notes.filter(note => regExp.test(note.info.title) || regExp.test(note.info.txt));
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
            backgroundColor: '#fff',
        }
    }
}

function getDefaultFilter(filterBy = {}) {
    return { txt: filterBy.txt || '', type: filterBy.type || '', title: filterBy.title || '' }
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
                imgUrls: [demoData.imgs[i]],
                videoUrls: [demoData.videos[i]],
                todo: [demoData.todos[i]],
            },
            style: {
                backgroundColor: utilService.getRandomColor(),
            }
        }

        notes.push(note)

    }
    utilService.saveToStorage(NOTE_KEY, notes)
}


function _setNextPrevNoteId(note) {
    return storageService.query(NOTE_KEY)
        .then((notes) => {
            const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
            const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
            const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
            note.nextNoteId = nextNote.id
            note.prevNoteId = prevNote.id
            return note
        })
}