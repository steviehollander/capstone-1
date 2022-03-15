import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


export const AddPiece = () => {
    const { closetId } = useParams()

    const [closet, updateCloset] = useState({})

    const [types, updateTypes] = useState(
        []


    )

    useEffect(
        () => {
            fetch("http://localhost:8088/pieceTypes")
                .then(res => res.json())
                .then((data) => {
                    //getting data back from API and passing to the stter
                    updateTypes(data)
                })
        },
        []
        //passing an empty array says to go trigger function once before the component is loaded
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/closets/${closetId}`)
                .then(res => res.json())
                .then((data) => {
                    //getting data back from API and passing to the stter
                    updateCloset(data)
                })
        },
        []
    )



    const [piece, setPiece] = useState({
        closetId: closetId,
        imgAddress: "",
        brand: "",
        price: 50,
        purchaseLink: "",
        pieceTypeId: 1



    });

    const history = useHistory()

    const AddNewPiece = (evt) => {
        evt.preventDefault()
        const newPiece = {
            closetId: parseInt(piece.closetId),
            imgAddress: piece.imgAddress,
            brand: piece.brand,
            price: parseFloat(piece.price),
            purchaseLink: piece.purchaseLink,
            pieceTypeId: parseInt(piece.pieceTypeId)
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPiece)
        }

        return fetch("http://localhost:8088/pieces?_expand=closet", fetchOption)

            .then((data) => {
                if (closet.closetTypeId === 1) {
                    history.push("/closet")
                }
                else {
                    history.push("/dreamcloset")
                }



            })
    }



    return (
        <form className="addPieceForm">
            <h2 className="addPieceForm__title">Add Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Item Picture:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...piece }
                                copy.imgAddress = evt.target.value
                                setPiece(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Image Address?"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Brand:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...piece }
                                copy.brand = evt.target.value
                                setPiece(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"

                    />
                </div>

            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Price:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...piece }
                                copy.price = evt.target.value
                                setPiece(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"

                    />
                </div>

            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Purchase Link:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = { ...piece }
                                copy.purchaseLink = evt.target.value
                                setPiece(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"

                    />
                </div>

            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="pieceType">Type</label>
                    <select
                        required autoFocus
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = { ...piece }
                                copy.pieceTypeId = evt.target.value
                                setPiece(copy)
                            }

                        }>
                        <option value="0">Item Category...</option>
                        {types.map(pieceType => <option value={pieceType.id}>{pieceType.type}</option>)}
                    </select>




                </div>
            </fieldset>



            <button onClick={AddNewPiece} className="btn btn-primary">
                Add to Closet!
            </button>
        </form>
    )
}