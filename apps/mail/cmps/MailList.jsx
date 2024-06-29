const { Link } = ReactRouterDOM

import { MailPreview } from '../cmps/MailPreview.jsx'
import { mailService } from '../services/mail.service.js'

export function MailList({ mails, onMailClick, onRemoveMail }) {
  return (
    <React.Fragment>
      <div className='main-mail-list'>
        <section className='list-options'>
          <button>cb</button>
          <button>cbdrop</button>
          <button>ref</button>
          <button>more</button>
          <button>pgnum</button>
          <button>pgbck</button>
          <button>pgfwd</button>
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
