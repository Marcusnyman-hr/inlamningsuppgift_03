import React, {useReducer, useContext} from 'react';
import axios from 'axios';
import { AuthTokenContext } from '../../context/Auth-token-context/AuthTokenContext'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component'

import './add-post.styles.scss'

export default function AddPost({toggleAddEntry, addEntry}) {
  const [authToken] = useContext(AuthTokenContext);
  const [newPost, setNewPost] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    title: '',
    desc: '',
    account: 'income',
    amount: '',
    currency: 'EUR',
    type: 'food',
    date: ''
    }
  )
  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:5000/api/money/add'
    const token = authToken.token;
    const newId = Math.random().toString(36).substr(5, 7)
    const post = {
      id: newId,
      account: newPost.account,
      title: newPost.title,
      desc: newPost.desc,
      amount: newPost.amount,
      currency: newPost.currency,
      type: newPost.type,
      date: newPost.date ? newPost.date : new Date().toLocaleDateString()
    }



    axios.post(url, post, {headers: {'auth-token': token}})
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          console.log(post)
        }
      })
      .catch((error) => {
        console.log(error)
      });
      console.log(post)
    addEntry(post);
    toggleAddEntry();

  }
  function handleChange(event) {
    event.preventDefault();
    const {name, value} = event.target;
    setNewPost({[name]:value})
  }
  return (
    <div className='add-post'>
      <div className='add-post-header'>
        <ul className='add-post-presets'>
        <li>Presets:</li>
        <li>restaurant</li>
        </ul>
        <span className='close-btn' onClick={() => toggleAddEntry()}>x</span>
      </div>
      <form className="add-post-form" onSubmit={handleSubmit}>
        <FormInput 
          label='Title'
          type='text'
          name='title'
          value={newPost.title}
          autoComplete="off"
          required
          onChange={handleChange}
        />
        <FormInput 
          label='Description'
          type='text'
          name='desc'
          value={newPost.desc}
          autoComplete="off"
          onChange={handleChange}
        />
         <FormInput 
          label='Amount'
          type='number'
          name='amount'
          value={newPost.amount}
          autoComplete="off"
          required
          onChange={handleChange}
        />
        <div className='add-post-form-select-container'>
        <select name="currency" onChange={handleChange} className='add-post-form-currency-select'>
          <option value="EUR">Euro</option>
          <option value="HRK">Hrk</option>
          <option value="SEK">Sek</option>
        </select>
        <select name="account" onChange={handleChange} className='add-post-form-account-select'>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        </div>
        <input className='add-post-date-picker' type="date" name="date" onChange={handleChange}></input>
        <CustomButton>Add</CustomButton>
      </form>
      
    </div>
  )
}
