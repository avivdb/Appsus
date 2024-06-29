import { mailService } from '../services/mail.service.js'

export function MailPreview({ mail, onMailClick, onRemoveMail }) {
  function onCheck(button) {
    switch (button.className.split(' ')[0]) {
      case 'check-box':
        button.classList.toggle('unchecked')
        button.classList.toggle('checked')
        break
      case 'star':
        button.classList.toggle('unchecked')
        button.classList.toggle('checked')
        break
      case 'important':
        button.classList.toggle('unchecked')
        button.classList.toggle('checked')
        break

      default:
        break
    }
  }

  function isClickSelectOptions({ button }) {
    // console.log('isclicked')
    switch (button.className.split(' ')[0]) {
      case 'check-box':
        // console.log('check-box')
        break
      case 'star':
        // console.log('star')
        break
      case 'important':
        // console.log('important')
        break
      case 'delete':
        console.log('delete')
        break
      default:
        break
    }
  }

  return (
    <div
      onClick={() => onMailClick(mail.id)}
      className={`mail-preview ${mail.isRead ? '' : 'unread'}`}
    >
      <div className='mail-select-options'>
        <button
          className='check-box unchecked'
          aria-label='check box'
          onClick={(e) => {
            e.stopPropagation()
            onCheck(e.currentTarget)
            isClickSelectOptions({ button: e.currentTarget })
          }}
        />
        <button
          className='star unchecked'
          aria-label='star'
          onClick={(e) => {
            e.stopPropagation()
            onCheck(e.currentTarget)
            isClickSelectOptions({ button: e.currentTarget })
          }}
        />
        <button
          className='important unchecked'
          aria-label='important'
          onClick={(e) => {
            e.stopPropagation()
            onCheck(e.currentTarget)
            isClickSelectOptions({ button: e.currentTarget })
          }}
        />
      </div>
      <span className='mail-from'>
        {mail.fromName} from {mail.fromSuffix}
      </span>
      <span className='mail-content'>body: {mail.bodySummary}</span>
      <span className='sentAt'>{mailService.convertToDate(mail.sentAt)}</span>
      <div className='mail-actions'>
        <button
          className='delete'
          aria-label='delete'
          onClick={(e) => {
            e.stopPropagation()
            onRemoveMail(mail.id)
            // onCheck(e.currentTarget)
            // isClickSelectOptions({ button: e.currentTarget })
          }}
        />
        <button
          className={mail.isRead ? 'drafts' : 'mark-email-unread'}
          aria-label={mail.isRead ? 'drafts' : 'mark email unread'}
        />
      </div>
    </div>
  )
}
