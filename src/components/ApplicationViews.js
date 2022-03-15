import React from "react"
import { Route } from "react-router-dom"
import { AddPiece } from "./AddPiece"
import { PieceListOne } from "./Closet"
import { DreamCloset } from "./DreamCloset"
import { EditPiece } from "./EditPiece"
import { WorldCloset } from "./WorldCloset"






export const ApplicationViews = () => {
    return (
        <>
            <Route path="/closet">
                <PieceListOne />
            </Route>
            <Route path="/dreamcloset">
                <DreamCloset />
            </Route>
            <Route path="/pieces/add/:closetId(\d+)">
                <AddPiece />
            </Route>
            <Route path="/pieces/edit/:pieceId(\d+)">
                <EditPiece />
            </Route>
            <Route path="/worldCloset">
                <WorldCloset />
            </Route>




        </>
    )
}



