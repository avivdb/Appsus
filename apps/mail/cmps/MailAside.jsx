import { MailCompose } from './MailCompose.jsx'
import { useState } from 'React'

export function MailAside({ mails, onAddMail }) {
  const [isCompose, setIsCompose] = useState(false)

  return (
    <section className='mail-aside'>
      <button className='compose-btn' onClick={() => setIsCompose(true)}>
        Compose
      </button>
      {isCompose && (
        <MailCompose
          mails={mails}
          onAddMail={onAddMail}
          onCancelEdit={() => setIsCompose(false)}
        />
      )}
      <div className='folder-menu'>
        {/* Added a span for the text within each button for better alignment */}
        <button className='mail-aside-btn mail-aside-btn-inbox'>
          <span>Inbox</span>
        </button>
        <button className='mail-aside-btn mail-aside-btn-starred'>
          <span>Starred</span>
        </button>
        <button className='mail-aside-btn mail-aside-btn-important'>
          <span>Important</span>
        </button>
        <button className='mail-aside-btn mail-aside-btn-sent'>
          <span>Sent</span>
        </button>
        <button className='mail-aside-btn mail-aside-btn-drafts'>
          <span>Drafts</span>
        </button>
        <button className='mail-aside-btn mail-aside-btn-trash'>
          <span>Trash</span>
        </button>
      </div>
    </section>
  )
}
