// mail service

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
// var gFilterBy = { title: '', subject: 0, body: '' }
// const filterBy = {
//   status: 'inbox/sent/trash/draft',
//   txt: 'puki', // no need to support complex text search
//   isRead: true, // (optional property, if missing: show all)
//   isStared: true, // (optional property, if missing: show all)
//   lables: ['important', 'romantic'], // has any of the labels
// }
_createMails()

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

export const mailService = {
  query,
  convertToDate,
  get,
  remove,
  save,
  getEmptyMail: getEmptyMail,
  getDefaultFilter,
  // getFilterBy,
  // setFilterBy,
  //   getNextCarId: getNextBookId,
}

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    const searchStr = filterBy.from
      .toLowerCase()
      .replace(/[.@]/g, '')
      .replace('com', '')

    mails = mails.filter((mail) => {
      const fromMatch = mail.from
        .toLowerCase()
        .replace(/[.@]/g, '')
        .replace('.com', '')
        .includes(searchStr)
      const subjectMatch = mail.subject.toLowerCase().includes(searchStr)
      const bodyMatch = mail.body.toLowerCase().includes(searchStr)
      return fromMatch || subjectMatch || bodyMatch
    })

    return mails
  })
}

// function query(filterBy = {}) {
//   console.log(filterBy.subject)
//   return storageService.query(MAIL_KEY).then((mails) => {
//     if (filterBy.from) {
//       const fromFilter = filterBy.from
//         .replace(/[.@]/g, '')
//         .toLowerCase()
//         .replace('com', '')
//       mails = mails.filter((mail) => {
//         const normalizedFrom = mail.from
//           .replace(/[.@]/g, '')
//           .toLowerCase()
//           .replace('com', '')
//         return normalizedFrom.includes(fromFilter)
//       })
//     }
//     if (filterBy.subject) {
//       const regex = new RegExp(filterBy.subject, 'i')
//       mails = mails.filter((mail) => regex.test(mail.subject))
//     }
//     if (filterBy.body) {
//       const regex = new RegExp(filterBy.body, 'i')
//       mails = mails.filter((mail) => regex.test(mail.body))
//     }
//     console.log('mails: ', mails)

//     return mails
//   })
// }

function getDefaultFilter(filterBy = { from: '', subject: '', body: '' }) {
  console.log('getDefautlFilter: ', filterBy)
  return { from: filterBy.from, subject: filterBy.subject, body: filterBy.body }
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId)
}

function convertToDate(timestamp) {
  const date = new Date(timestamp)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
  }
  return date.toLocaleDateString(undefined, options)
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function getEmptyMail(from = '', subject = '', body = '') {
  return {
    from,
    subject,
    body,
  }
}

// function getEmptyMail(title = '', subject = 0) {
//   // return { id: '', vendor, maxSpeed }
//   return {
//     id: '',
//     title,
//     body: 'Not An Author',
//     subject,
//     thumbnail: './assets/img/returnnull.jpg',
//   }
// }

// Example usage
const timestamp = 1627488000000 // Replace this with your actual timestamp
console.log(convertToDate(timestamp)) // Outputs: "July 28, 2021, 00:00 AM" (or similar based on locale)

function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: 'e101',
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'It was great seeing you last week! Hope we can meet again soon.',
        bodySummary: 'It was great seeing',
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
        body: 'Can we schedule a meeting for next Thursday? I need your insights on the project.',
        bodySummary: 'Can we schedule a',
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
        body: 'Please confirm if the time zone difference will affect our deadline. Urgent response needed.',
        bodySummary: 'Please confirm if the',
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
        body: 'The latest update on our project is ready for review. Please check the attached files.',
        bodySummary: 'The latest update on',
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
        body: 'Just wanted to say hi and see how everything is going with you these days. Let’s catch up soon!',
        bodySummary: 'Just wanted to say',
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
      {
        id: 'e106',
        createdAt: 1564093930500,
        subject: 'Weekly Update',
        body: 'Here is your weekly update. Lots of progress made on the current projects!',
        bodySummary: 'Here is your weekly update. Lots of',
        isRead: true,
        sentAt: 1564180330500,
        removedAt: null,
        from: 'john@workInc.com',
        to: 'user@appsus.com',
        labels: ['business', 'important'],
        isStarred: false,
        txt: 'john user',
        status: 'inbox',
        fromName: 'john',
        toName: 'user',
        fromSuffix: 'workInc',
      },
      {
        id: 'e107',
        createdAt: 1566685930500,
        subject: 'Meeting Reminder',
        body: 'Just a reminder about our meeting scheduled for tomorrow. Please be on time.',
        bodySummary: 'Just a reminder about our meeting scheduled',
        isRead: false,
        sentAt: 1566772330500,
        removedAt: null,
        from: 'sara@homeInc.com',
        to: 'user@appsus.com',
        labels: ['important', 'personal'],
        isStarred: true,
        txt: 'sara user',
        status: 'inbox',
        fromName: 'sara',
        toName: 'user',
        fromSuffix: 'homeInc',
      },
      {
        id: 'e108',
        createdAt: 1569277930500,
        subject: 'Discount Offer',
        body: 'We are offering a special discount this month. Check out our latest deals!',
        bodySummary: 'We are offering a special discount this month.',
        isRead: true,
        sentAt: 1569364330500,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'lily@shopInc.com',
        labels: ['personal', 'business'],
        isStarred: false,
        txt: 'user lily',
        status: 'sent',
        fromName: 'user',
        toName: 'lily',
        fromSuffix: 'appsusInc',
      },
      {
        id: 'e109',
        createdAt: 1571869930500,
        subject: 'New Features',
        body: 'We have updated our platform with new features. Let us know your thoughts!',
        bodySummary: 'We have updated our platform with new',
        isRead: false,
        sentAt: 1571956330500,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'max@techInc.com',
        labels: ['business', 'important'],
        isStarred: true,
        txt: 'user max',
        status: 'sent',
        fromName: 'user',
        toName: 'max',
        fromSuffix: 'appsusInc',
      },
      {
        id: 'e110',
        createdAt: 1574461930500,
        subject: 'Thank You Note',
        body: 'Thank you for your support during the conference. Your insights were incredibly valuable.',
        bodySummary: 'Thank you for your support during the',
        isRead: true,
        sentAt: 1574548330500,
        removedAt: null,
        from: 'momo@momoInc.com',
        to: 'user@appsus.com',
        labels: ['personal', 'romantic'],
        isStarred: false,
        txt: 'momo user',
        status: 'inbox',
        fromName: 'momo',
        toName: 'user',
        fromSuffix: 'momoInc',
      },
    ]

    utilService.saveToStorage(MAIL_KEY, mails)
    // console.log(mails[0].from)
  }
}
