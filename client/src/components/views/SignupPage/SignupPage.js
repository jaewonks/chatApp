import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { signUpUser } from './../../../_actions/user_actions'

function SignupPage(props) {
    const dispatch = useDispatch()

    const [Email, setEmail] = useState('')
    const [Name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPW, setConfirmPW] = useState('')

    const onEmailhandler = e => {
        setEmail(e.currentTarget.value)
    }
    const onNamehandler = e => {
        setName(e.currentTarget.value)
    }
    const onPWhandler = e => {
        setPassword(e.currentTarget.value)
    }
    const onConfirmPWhandler = e => {
        setConfirmPW(e.currentTarget.value)
    }
    const onSubmitHandler = e => {
        e.preventDefault()
        if(Password !== ConfirmPW){
            return alert("Password isn't Matched")
        }
        //폼(클라이언트)에서 전해진 정보
        let body = {
            email: Email,
            name: Name,
            password: Password
        }
        //정보를 담아 action으로 보냅니다.
        dispatch(signUpUser(body))
            .then(response => {
                console.log(response)
                if(response.payload.signupSuccess){
                    props.history.push('/signin')
                } else {
                    alert('Fail to Sign UP')
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
                <lable>Name</lable>
                <input type='text' value={Name} onChange={onNamehandler} />
                <lable>Password</lable>
                <input type='password' value={Password} onChange={onPWhandler} />
                <lable>Confirm Password</lable>
                <input type='password' value={ConfirmPW} onChange={onConfirmPWhandler} />
                <br/>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default withRouter(SignupPage)
