const { Link } = ReactRouterDOM

import { MailPreview } from '../cmps/MailPreview.jsx'
import { mailService } from '../services/mail.service.js'

export function MailList({ mails, onMailClick, onRemoveMail }) {
  return (
    <React.Fragment>
      <div className='main-mail-list'>
        <section className='list-options'>
          <button type='button'>cb</button>
          <button type='button'>cbdrop</button>
          <button type='button'>ref</button>
          <button type='button'>more</button>
          <button type='button'>pgnum</button>
          <button type='button'>pgbck</button>
          <button type='button'>pgfwd</button>
        </section>
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
      </div>
    </React.Fragment>
  )
}
