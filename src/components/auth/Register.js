import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Register.css"
import LogoImg from "../../images/ClosetCase.jpg"

export const Register = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()

    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://capstone-1-api-nw5wj.ondigitalocean.app/users?email=${user.email}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("https://capstone-1-api-nw5wj.ondigitalocean.app/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("cm_user", createdUser.id)
                                fetch("https://capstone-1-api-nw5wj.ondigitalocean.app/closets", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ userId: createdUser.id, closetTypeId: 1 })
                                }).then(() => fetch("https://capstone-1-api-nw5wj.ondigitalocean.app/closets", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ userId: createdUser.id, closetTypeId: 2 })
                                })).then(() => history.push("/"))
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }


    return (

        <div className="registerJush">
            <main style={{ textAlign: "center" }}>
                <dialog className="dialog dialog--password" ref={conflictDialog}>
                    <div>Account with that email address already exists</div>
                    <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
                </dialog>

                <form className="form--login" onSubmit={handleRegister}>
                    <img class="registerlogo" src={LogoImg} alt="" />
                    <br />
                    <div className="registerName">
                        <label htmlFor="name"> Full Name: </label>
                        <input onChange={updateUser}
                            type="text" id="name" className="form-control"
                            placeholder="Enter your name" required autoFocus />
                    </div>
                    <br />


                    <div className="registerEmail">
                        <label htmlFor="email"> Email address: </label>
                        <input onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                    </div>
                    <br />
                    <button className="submitButton2" type="submit"> Register </button>

                </form>
            </main>
        </div >
    )
}

