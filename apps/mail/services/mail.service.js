// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
var gFilterBy = { title: '', amount: 0, authors: '' }
_createMails()

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

const filterBy = {
  status: 'inbox/sent/trash/draft',
  txt: 'puki', // no need to support complex text search
  isRead: true, // (optional property, if missing: show all)
  isStared: true, // (optional property, if missing: show all)
  lables: ['important', 'romantic'], // has any of the labels
}

export const mailService = {
  query,
  convertToDate,
  //   get,
  //   remove,
  //   save,
  //   getEmptyBook: getEmptyBook,
  //   getNextCarId: getNextBookId,
  //   getFilterBy,
  //   setFilterBy,
  //   getDefaultFilter,
}

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.title) {
      const regex = new RegExp(filterBy.title, 'i')
      books = books.filter((book) => regex.test(book.title))
    }
    if (filterBy.amount) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.amount)
    }
    if (filterBy.authors) {
      const regex = new RegExp(filterBy.authors, 'i')
      books = books.filter((book) => regex.test(book.authors))
    }

    return mails
  })
}

function convertToDate(timestamp) {
  const date = new Date(timestamp)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return date.toLocaleDateString(undefined, options)
}

// Example usage
const timestamp = 1627488000000 // Replace this with your actual timestamp
console.log(convertToDate(timestamp)) // Outputs: "July 28, 2021, 00:00 AM" (or similar based on locale)

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    const mails = [
      {
        id: 'e101',
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
        bodySummary: 'Lorem ipsum dolor sit',
        isRead: true,
        sentAt: 1551220330500,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        labels: ['romantic', 'personal'],
        isStarred: false,
        txt: 'momo user',
        status: 'inbox',
        fromName: 'momo',
        toName: 'user',
        fromSuffix: 'momoInc',
      },
      {
        id: 'e102',
        createdAt: 1553725930500,
        subject: 'Catch soon',
        body: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        bodySummary: 'Ut enim ad minim',
        isRead: true,
        sentAt: 1553812330500,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        labels: ['important', 'business'],
        isStarred: false,
        txt: 'momo user',
        status: 'inbox',
        fromName: 'momo',
        toName: 'user',
        fromSuffix: 'momoInc',
      },
      {
        id: 'e103',
        createdAt: 1556317930500,
        subject: 'Time zone',
        body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        bodySummary: 'Duis aute irure dolor',
        isRead: false,
        sentAt: 1556404330500,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'newuser@appsus.com',
        labels: ['business', 'personal'],
        isStarred: false,
        txt: 'user newuser',
        status: 'sent',
        fromName: 'user',
        toName: 'newuser',
        fromSuffix: 'appsusInc',
      },
      {
        id: 'e104',
        createdAt: 1558909930500,
        subject: 'Project update',
        body: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.',
        bodySummary: 'Excepteur sint occaecat cupidatat',
        isRead: true,
        sentAt: 1558996330500,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'anotheruser@appsus.com',
        labels: ['romantic', 'business'],
        isStarred: false,
        txt: 'user anotheruser',
        status: 'sent',
        fromName: 'user',
        toName: 'anotheruser',
        fromSuffix: 'appsusInc',
      },
      {
        id: 'e105',
        createdAt: 1561501930500,
        subject: 'Hello there',
        body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
        bodySummary: 'Sed ut perspiciatis unde',
        isRead: false,
        sentAt: 1561588330500,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'differentuser@appsus.com',
        labels: ['important', 'personal'],
        isStarred: true,
        txt: 'user differentuser',
        status: 'draft',
        fromName: 'user',
        toName: 'differentuser',
        fromSuffix: 'appsusInc',
      },
    ]

    utilService.saveToStorage(MAIL_KEY, mails)
  }
}

// const gEmails = [
//   {
//     id: 'e101',
//     createdAt: 1551133930500,
//     subject: 'Miss you!',
//     body: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
//     isRead: true,
//     sentAt: 1551220330500,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com',
//     labels: ['romantic', 'personal'],
//     isStarred: false,
//     txt: 'momo user',
//     status: 'inbox',
//   },
//   {
//     id: 'e102',
//     createdAt: 1553725930500,
//     subject: 'Catch soon',
//     body: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     isRead: true,
//     sentAt: 1553812330500,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com',
//     labels: ['important', 'business'],
//     isStarred: false,
//     txt: 'momo user',
//     status: 'inbox',
//   },
//   {
//     id: 'e103',
//     createdAt: 1556317930500,
//     subject: 'Time zone',
//     body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//     isRead: false,
//     sentAt: 1556404330500,
//     removedAt: null,
//     from: 'user@appsus.com',
//     to: 'newuser@appsus.com',
//     labels: ['business', 'personal'],
//     isStarred: false,
//     txt: 'user newuser',
//     status: 'sent',
//   },
//   {
//     id: 'e104',
//     createdAt: 1558909930500,
//     subject: 'Project update',
//     body: 'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     isRead: true,
//     sentAt: 1558996330500,
//     removedAt: null,
//     from: 'user@appsus.com',
//     to: 'anotheruser@appsus.com',
//     labels: ['romantic', 'business'],
//     isStarred: false,
//     txt: 'user anotheruser',
//     status: 'sent',
//   },
//   {
//     id: 'e105',
//     createdAt: 1561501930500,
//     subject: 'Hello there',
//     body: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
//     isRead: false,
//     sentAt: 1561588330500,
//     removedAt: null,
//     from: 'user@appsus.com',
//     to: 'differentuser@appsus.com',
//     labels: ['important', 'personal'],
//     isStarred: true,
//     txt: 'user differentuser',
//     status: 'draft',
//   },
// ]

// const gEmail = {
//   id: 'e101',
//   createdAt: 1551133930500,
//   subject: 'Miss you!',
//   body: 'Would love to catch up sometimes',
//   isRead: false,
//   sentAt: 1551133930594,
//   removedAt: null,
//   from: 'momo@momo.com',
//   to: 'user@appsus.com',
//   lables: ['important', 'romantic'],
//   isStared: true,
//   sRead: true,
//   txt: 'puki',
//   status: 'inbox/sent/trash/draft',
// }
