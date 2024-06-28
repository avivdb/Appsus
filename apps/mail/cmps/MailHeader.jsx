import { MailFilter } from '../cmps/MailFilter.jsx'

export function MailHeader({ filterBy, onSetFilter }) {
  return (
    <React.Fragment>
      <section className='mail-header'>
        <section className='mail-header-menu'>menu+logo</section>

        <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <section className='mail-header-nav'>nav+settings</section>
      </section>
    </React.Fragment>
  )
}
