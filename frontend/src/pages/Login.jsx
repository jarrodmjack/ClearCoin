import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'



const Login = () => {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = userData

    const onEmailChange = (e) => {
        setUserData({...userData, email: e.target.value})
    }

    const onPasswordChange = (e) => {
        setUserData({...userData, password: e.target.value})
    }
    


    const handleLogin = (e) => {
        e.preventDefault();

        const userFormData = {
            email,
            password,
        };

       axios.post('/api/login', userFormData)

    }


    return (
        <div className="hero h-full md:h-[800px] bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Log in to Clearcoin</h1>
                    <p className="py-6">Login to gain access to the portfolio/transaction tracker</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin} action="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    name='email'
                                    type="text"
                                    placeholder="email"
                                    className="input input-bordered"
                                    value={email}
                                    onChange={onEmailChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    name='password'
                                    type="password" 
                                    placeholder="password" 
                                    className="input input-bordered"
                                    value={password}
                                    onChange={onPasswordChange}
                                    />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login