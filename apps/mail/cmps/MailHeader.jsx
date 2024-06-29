import { MailFilter } from '../cmps/MailFilter.jsx'

export function MailHeader({ filterBy, onSetFilter }) {
  return (
    <React.Fragment>
      <section className='mail-header'>
        <div className='mail-header-menu'>
          <button className='mail-menu-toggle-width'></button>
          <button className='mail-logo-header-wide'></button>
        </div>
        <div className='mail-header-main'>
          <div className='mail-header-search'>
            <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
          </div>
          <div className='mail-header-nav'>
            <button className='mail-header-nav-btn-help'></button>
            <button className='mail-header-nav-btn-settings'></button>
            <button className='mail-header-nav-btn-appselector'></button>
            <button className='mail-header-nav-btn-userlogo'></button>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
