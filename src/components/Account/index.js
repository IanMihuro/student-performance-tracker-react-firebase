import React from 'react'

import PasswordChangePage from '../PasswordChange'
import  PasswordForgetPage from '../PasswordForget'

export default function Account() {
    return (
        <div>
            <h1>Account Page</h1>
            <PasswordChangePage />
            <PasswordForgetPage />
            
        </div>
    )
}
