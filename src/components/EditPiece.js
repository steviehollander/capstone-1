import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom";




export const EditPiece = () => {
    const { pieceId } = useParams()

    const [closet, updateCloset] = useState({})


    const [types, updateTypes] = useState(
        []


    )
    const [piece, setPiece] = useState({})

    useEffect(
        () => {
            return fetch(`http://localhost:8088/pieces/${pieceId}`)
                .then(response => response.json())
                .then((data) => {
                    setPiece(data)
                    fetch(`http://localhost:8088/closets/${data.closetId}`)
                        .then(res => res.json())
                        .then((data) => {
                            //getting data back from API and passing to the stter
                            updateCloset(data)
                        })
                })

        },
        [pieceId]  // Above function runs when the value of ticketId change
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






    const history = useHistory()

    const UpdatePiece = (evt) => {
        evt.preventDefault()
        const UpdatedPiece = {
            closetId: parseInt(piece.closetId),
            imgAddress: piece.imgAddress,
            brand: piece.brand,
            price: parseFloat(piece.price),
            purchaseLink: piece.purchaseLink,
            pieceTypeId: parseInt(piece.pieceTypeId)
        }



        return fetch(`http://localhost:8088/pieces/${pieceId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(UpdatedPiece)

        })
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
                        value={piece.imgAddress}
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
                        value={piece.brand}
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
                        value={piece.price}
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
                        value={piece.purchaseLink}
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
                        value={piece.pieceTypeId}
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



            <button onClick={UpdatePiece} className="btn btn-primary">
                Save Piece!
            </button>
        </form>
    )
}