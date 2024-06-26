import { mailService } from '../services/mail.service.js'

export function MailPreview({ mail, onMailClick }) {
  return (
    <div
      onClick={() => onMailClick(mail.id)}
      className={`mail-preview ${mail.isRead ? '' : 'unread'}`}
    >
      <div className='mail-select-options'>
        <img
          src='apps/mail/assets/icons/check_box_outline_blank_baseline_nv700_20dp.png'
          className='check-box unchecked'
          alt='check box'
        />
        <img
          src='apps/mail/assets/icons/star_baseline_nv700_20dp.png'
          className='star unchecked'
          alt='star'
        />
        <img
          src='apps/mail/assets/icons/label_important_baseline_nv700_20dp.png'
          className='important unchecked'
          alt='important'
        />
      </div>
      <span className='mail-from'>
        {mail.fromName} from {mail.fromSuffix}
      </span>
      <span className='mail-content'>body: {mail.bodySummary}</span>
      <span className='sentAt'>{mailService.convertToDate(mail.sentAt)}</span>
      <div className='mail-actions'>
        <img
          src='apps/mail/assets/icons/delete_baseline_nv700_20dp.png'
          alt='delete'
        />
        <img
          src={`apps/mail/assets/icons/${
            mail.isRead
              ? 'drafts_baseline_nv700_20dp'
              : 'mark_email_unread_baseline_nv700_20dp'
          }.png`}
          alt='unread'
        />
      </div>
    </div>
  )
}
