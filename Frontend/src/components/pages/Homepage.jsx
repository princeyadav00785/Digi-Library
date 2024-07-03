import React from 'react'
import Upcoming from '../components/latestBooks'
import BooksList from '../components/BookList'


function Homepage() {
  return (
    <div>
        <Upcoming/>
        <BooksList/>
    </div>
  )
}

export default Homepage