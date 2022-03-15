import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
export const WorldCloset = () => {
    // see customers, setCustomers as "hybrid variable"
    // first variable is similar to getter function, left is similar to setter function
    //setCustomers alows you to set state
    const [items, setItems] = useState([])
    // Use state is a function that creates a variable for you

    const history = useHistory()


    useEffect(
        () => {
            fetch("http://localhost:8088/pieces")
                .then(res => res.json())
                .then((data) => {
                    //getting data back from API and passing to the stter
                    setItems(data)
                })
        },
        []
        //passing an empty array says to go trigger function once before the component is loaded
    )

    useEffect(
        () => {

        },
        [items]
    )

    return (
        <>
            <h2 class="closetHeader">Our Closet</h2>


            {



                items.map(
                    (item) => {

                        return <p class="items" key={`item--${item.id}`}><img class="pieceImg" src={item.imgAddress} />  <br /> Brand: {item.brand} <br /> Price: ${item.price} <br />    <a class="purchaseLinkage" target="_blank" href={item.purchaseLink}>Purchase Link</a>
                        </p>
                    }
                )
            }
        </>
    )
}