import { MailCompose } from './MailCompose.jsx'
import { useState } from 'React'

export function MailAside({ mails, onAddMail }) {
  const [isCompose, setIsCompose] = useState(false)

  return (
    <section className='mail-aside'>
      <h1>MailAside</h1>
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
    </section>
  )
}
