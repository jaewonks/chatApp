import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

function LandingPage(props) {

    const onClickHandler = e => {
        axios.get('/api/users/signout')
            .then(response => {
                if(response.data){
                    props.history.push('/signin')
                } else {
                    alert('Fail to Sign Out')
                }
            })
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh'
            }}
        >
            <h2>LandingPage</h2>
            <button onClick={onClickHandler}>Sign Out</button>
        </div>
    )
}

export default withRouter(LandingPage)
