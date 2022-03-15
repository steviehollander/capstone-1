import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Closet.css"
export const PieceListOne = () => {
    // see customers, setCustomers as "hybrid variable"
    // first variable is similar to getter function, left is similar to setter function
    //setCustomers alows you to set state
    const [items, setItem] = useState([])
    const [closet, setCloset] = useState({})
    // Use state is a function that creates a variable for you
    const history = useHistory()
    const updateItemList = () => {
        fetch(`http://localhost:8088/closets?userId=${localStorage.getItem("cm_user")}&_embed=pieces&closetTypeId=1`)
            .then(res => res.json())
            .then((data) => {
                //getting data back from API and passing to the stter

                setCloset(data[0])
                data.length > 0 ? setItem(data[0].pieces) : setItem([])
            })
    }
    useEffect(
        () => {
            updateItemList()
        },
        []
        //passing an empty array says to go trigger function once before the component is loaded
    )



    const deleteItem = (id) => {
        fetch(`http://localhost:8088/pieces/${id}`, {
            method: "DELETE"
        })
            .then(() => { updateItemList() })
    }


    return (
        <>
            <h2 class="closetHeader">My Closet</h2>
            <div>
                <button onClick={() => history.push(`/pieces/add/${closet.id}`)}>Add Item</button>
            </div>


            {



                items.map(
                    (item) => {

                        return <p class="items" key={`item--${item.id}`}><img class="pieceImg" src={item.imgAddress} />  <br /> Brand: {item.brand} <br /> Price: ${item.price} <br />    <a class="purchaseLinkage" target="_blank" href={item.purchaseLink}>Purchase Link</a> <button onClick={() => {
                            deleteItem(item.id)
                        }}>Delete</button>  <button onClick={() => history.push(`/pieces/edit/${item.id}`)}>Edit Item</button>    </p>
                    }
                )
            }
        </>
    )
}


