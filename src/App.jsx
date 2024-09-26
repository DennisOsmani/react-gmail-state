import { useEffect, useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'


function App() {
  // Use initialEmails for state

  const [emails, setEmails] = useState([]);
  const [emailsRead, setEmailsRead] = useState(false);
  const [emailsStarred, setEmailsStarred] = useState(false);

  useEffect(() => {

    setEmails(initialEmails);
  }, [])

  const toggleRead = (emailId) => {
    setEmails(
      emails.map((email) =>
        email.id === emailId ? { ...email, read: !email.read } : email
    )
  );
  }

  const toggleStar = (emailId) => {
    setEmails(
      emails.map((email) => 
        email.id === emailId ? {...email, starred: !email.starred } : email
    )
    )
  }

  function getReadEmail(emails) {
    return emailsRead ? emails.filter((email) => !email.read) : emails;
  }

  function getStarred(emails) {
    return emailsStarred ? emails.filter((email) => email.starred) : emails;
  }

  //emails.filter((e) => e.read === true).forEach((e) => console.log(e.sender + " " + e.read));

  function renderEmails() {
    return getReadEmail(getStarred(emails)).map((email) => (
      <li key={email.id} className="email">
        <div className="select">
          <input className="select-checkbox" 
            type="checkbox" 
            checked={email.read}
            onChange={() => toggleRead(email.id)}/>
        </div>  
        <div className="star">
          <input className="star-checkbox" 
          type="checkbox" 
          checked={email.starred}
          onChange={() => toggleStar(email.id)} />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.subject}</div>
      </li>
    ));
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            //onClick={() => renderEmails()}
          >
            <span className="label" >Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li
            className="item"
            onClick={() => setEmailsStarred((prev) => !prev)}
          >
            <span className="label">Starred</span>
            <span className="count">{emails.filter((e) => e.starred === true).length}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={emailsRead} 
              onChange={() => setEmailsRead((prev) => !prev)} 
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{renderEmails()}</main>
    </div>
  )
}

export default App
