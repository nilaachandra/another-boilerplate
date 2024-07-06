import React, { ReactNode } from 'react'

const MaxWidthWrapper = ({children} : {children: ReactNode}) => {
  return (
    <div className=''>
        {children}
    </div>
  )
}

export default MaxWidthWrapper