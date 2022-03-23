import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Closet.css"
import LogoImg from "../images/MyClosetLogo.jpg"
export const PieceListOne = () => {
    // see customers, setCustomers as "hybrid variable"
    // first variable is similar to getter function, left is similar to setter function
    //setCustomers alows you to set state
    const [items, setItem] = useState([])
    const [closet, setCloset] = useState({})
    const [query, setQuery] = useState("")
    const [types, updateTypes] = useState(
        []


    )
    const [searchedItems, setSearchedItem] = useState([])


    // Use state is a function that creates a variable for you
    const history = useHistory()
    const updateItemList = () => {
        fetch(`http://localhost:8088/closets?userId=${localStorage.getItem("cm_user")}&_embed=pieces&closetTypeId=1`)
            .then(res => res.json())
            .then((data) => {
                //getting data back from API and passing to the stter

                setCloset(data[0])
                data.length > 0 ? setItem(data[0].pieces) : setItem([])
                data.length > 0 ? setSearchedItem(data[0].pieces) : setItem([])
            })
    }


    useEffect(
        () => {
            if (query !== "") {
                let filteredItems = items.filter(itemObject => {
                    const foundPieceType = types.find((type) => {
                        return type.id === itemObject.pieceTypeId
                    })


                    if (foundPieceType.type.toLowerCase().includes(query.toLowerCase())) {
                        return true
                    }
                    else {
                        return false
                    }

                })
                setSearchedItem(filteredItems)
            } else {
                setSearchedItem(items)
            }

        },
        [query]
    )





    useEffect(
        () => {
            fetch("http://localhost:8088/pieceTypes")
                .then(res => res.json())
                .then((data) => {
                    //getting data back from API and passing to the stter
                    updateTypes(data)
                })
                .then(updateItemList)

        },
        []
        //passing an empty array says to go trigger function once before the component is loaded
        // foundPieceType = piecetypes.find
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



    const deleteItem = (id) => {
        fetch(`http://localhost:8088/pieces/${id}`, {
            method: "DELETE"
        })
            .then(() => { updateItemList() })
    }


    return (
        <>

            <div className="ourClosetContainer">
                <img class="logoOurCloset" src={LogoImg} alt="" />
            </div>
            <div>
                <button onClick={() => history.push(`/pieces/add/${closet.id}`)}>Add Item</button>
            </div>
            <div>
                <input placeholder="Search for item type" onChange={event => setQuery(event.target.value)}></input>






            </div>

            <div class="itemContainer">

                {



                    searchedItems.map(
                        (item) => {

                            return <div class="items" key={`item--${item.id}`}><img class="pieceImg" src={item.imgAddress} />  <br /> Brand: {item.brand} <br /> Price: ${item.price} <br />    <a class="purchaseLinkage" target="_blank" href={item.purchaseLink}>Purchase Link</a> <button onClick={() => {
                                deleteItem(item.id)
                            }}>Delete</button>  <button onClick={() => history.push(`/pieces/edit/${item.id}`)}>Edit Item</button>    </div>
                        }
                    )
                }

            </div>
        </>
    )
}


