import React from 'react'
import { SignUp } from '@clerk/nextjs'

function signup() {
  return (
    <div className='flex item-center justify-center h-full '>
        <SignUp></SignUp>
      
    </div>
  )
}

export default signup
