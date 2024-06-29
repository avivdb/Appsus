const { useState } = React
import { MailCompose } from '../pages/MailCompose.jsx'

export function MailAside({
  mails,
  onAddMail,
  onCompose,
  isCompose,
  setIsCompose,
}) {
  //   const [isCompose, setIsCompose] = useState(false)

  console.log('Render MailAside, isCompose:', isCompose)

  return (
    <section className='mail-aside'>
      <button
        className='compose-btn'
        onClick={() => {
          console.log('Compose button clicked')
          setIsCompose(true)
        }}
      >
        Compose
      </button>

      <div className='folder-menu'>
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
