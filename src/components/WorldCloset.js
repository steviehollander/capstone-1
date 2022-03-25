import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import LogoImg from "../images/OurClosetLogo.PNG"
import "./Closet.css"
export const WorldCloset = () => {
    // see customers, setCustomers as "hybrid variable"
    // first variable is similar to getter function, left is similar to setter function
    //setCustomers alows you to set state
    const [items, setItems] = useState([])
    const [query, setQuery] = useState("")
    const [types, updateTypes] = useState(
        []


    )
    const [searchedItems, setSearchedItem] = useState([])
    // Use state is a function that creates a variable for you

    const history = useHistory()


    useEffect(
        () => {
            fetch("https://capstone-1-api-nw5wj.ondigitalocean.app/pieces")
                .then(res => res.json())
                .then((data) => {
                    //getting data back from API and passing to the stter
                    setItems(data)
                    setSearchedItem(data)
                })
        },
        []
        //passing an empty array says to go trigger function once before the component is loaded
    )
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

        },
        [items]
    )


    useEffect(
        () => {
            fetch("hhttps://capstone-1-api-nw5wj.ondigitalocean.app/pieceTypes")
                .then(res => res.json())
                .then((data) => {
                    //getting data back from API and passing to the stter
                    updateTypes(data)
                })
        },
        []
        //passing an empty array says to go trigger function once before the component is loaded
    )

    return (
        <>

            <div className="ourClosetContainer">
                <img class="logoOurCloset" src={LogoImg} alt="" />
            </div>
            <div>
                <input placeholder="Search for item type" onChange={event => setQuery(event.target.value)}></input>






            </div>


            <div class="itemContainer">

                {



                    searchedItems.map(
                        (item) => {

                            return <p class="items" key={`item--${item.id}`}><img class="pieceImg" src={item.imgAddress} />  <br /> Brand: {item.brand} <br /> Price: ${item.price} <br />    <a class="purchaseLinkage" target="_blank" href={item.purchaseLink}>Purchase Link</a>
                            </p>
                        }
                    )
                }
            </div>
        </>
    )
}