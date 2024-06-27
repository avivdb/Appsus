import { MailPreview } from '../cmps/MailPreview.jsx'
import { mailService } from '../services/mail.service.js'

export function MailList({ mails, onMailClick, onRemoveMail }) {
  return (
    <React.Fragment>
      <div>Inbox</div>
      <ul className='mails-list'>
        {mails.map((mail) => (
          <li key={mail.id} className={mail.isRead ? '' : 'unread'}>
            <MailPreview
              mail={mail}
              onMailClick={onMailClick}
              onRemoveMail={onRemoveMail}
            />
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}
