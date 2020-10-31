import React from 'react';

import './money-entry.styles.scss';

//component rendered for each income/expense entry
export default function MoneyEntry({entryData, account, index, deleteEntry}) {
  const {title, amount, currency, date, desc, id} = entryData;
  console.log(date)
  return (
    <div className={index % 2 ? 'money-entry' : "money-entry dark"}>
      <div className='money-entry-info'>
        <span className='money-entry-date'>{date}</span>
        {title}: {amount} {currency.toLowerCase()} 
        <p className='money-entry-desc'>{desc}</p>
      </div>
      <div className='money-entry-delete' onClick={() => deleteEntry(id, account)}>
        <i className="fas fa-trash-alt money-entry-delete-btn"></i>
      </div>
    </div>
  )
}

