import React, { useState, useEffect } from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['mytoken'])
    const [isLogin, setLogin] = useState(true)
    let history = useHistory()


    useEffect(() => {
        if (token['mytoken']) {
            history.push('/articles')
        }
    }, [token])


    const loginBtn = () => {
        APIService.LoginUser({ username, password })
            .then(res => setToken('mytoken', res.token))
            .catch(error => console.log(error))
    }

    const registerBtn = () => {
        APIService.RegisterUser({ username, password })
            .then(res => window.location.href = "/")
            .catch(error => console.log(error))
    }
    return (
        <div className="App">
            <br />
            <br />
            {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}
            <br />
            <br />
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" value={username} className="form-control" id="username" placeholder="please enter username"
                    onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" value={password} className="form-control" id="password" placeholder="please enter password"
                    onChange={e => setPassword(e.target.value)} />
            </div>
            {isLogin ? <button className="btn btn-primary" onClick={loginBtn}>Login</button>
                : <button className="btn btn-primary" onClick={registerBtn}>Register</button>}
            <div className="mb-3">
                <br />
                {isLogin ? <h5>If you don't have an account, Please <button className="btn btn-primary btn-sm"
                    onClick={() => setLogin(false)}>Register</button> here.</h5>
                    : <h5>If you have an account,Please <button className="btn btn-primary btn-sm"
                        onClick={() => setLogin(true)}>Login</button> here.</h5>
                }
            </div>
        </div>
    )
}


export default Login