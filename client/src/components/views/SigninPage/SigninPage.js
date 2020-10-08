import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loginUser } from './../../../_actions/user_actions'

function SigninPage(props) {
    //redux로 정보를 보낸다
    const dispatch = useDispatch()

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const onEmailhandler = e => {
        setEmail(e.currentTarget.value)
    }
    const onPWhandler = e => {
        setPassword(e.currentTarget.value)
    }
    const onSubmitHandler = e => {
        e.preventDefault()
        //폼(클라이언트)에서 전해진 정보
        let body = {
            email: Email,
            password: Password
        }
        //정보를 담아 action으로 보냅니다.
        dispatch(loginUser(body))
            .then(response => {
                console.log(response)
                if(response.payload.signinSuccess){
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })

    }

    return (
        <div
            style = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh'
            }}
        >
            <form 
                onSubmit={onSubmitHandler}
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <lable>Email</lable>
                <input type='email' value={Email} onChange={onEmailhandler} />
                <lable>Password</lable>
                <input type='password' value={Password} onChange={onPWhandler} />
                <br/>
                <button type='submit'>Sign In</button>
            </form>
        </div>
    )
}

export default withRouter(SigninPage)
