import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import TripleSectionContent from "../components/TripleSectionContent"
import { toast } from 'react-toastify';



const Signup = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { username, email, password, confirmPassword } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error('You fucked up')
            return
        }
        const userData = {
            username,
            email,
            password,
        };


        const res = await axios.post('/api/signup', userData)
        console.log(res)

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
                        <form onSubmit={handleSignup} action="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    name='username'
                                    type="text"
                                    placeholder="username"
                                    className="input input-bordered"
                                    value={username}
                                    onChange={onChange}
                                />
                            </div>


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
                                    onChange={onChange}
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
                                    onChange={onChange}
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    name='confirmPassword'
                                    type="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    value={confirmPassword}
                                    onChange={onChange}
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-accent">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup