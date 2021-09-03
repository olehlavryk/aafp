import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "src/components/Icons/Icon";
import { addToFavorite, getFavorites, removeFromFavorite, setFavorites, setIsOpenFavoriteModal } from "src/store/actions";
import { isLoggedSelector } from "src/store/selectors";
import "./ProductReaction.css"

export const ProductReaction = ({ id, favorite }) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [isFavorite, setIsFavorite] = useState(favorite);
    const isLoggedIn = useSelector(isLoggedSelector);

    const reactionFlow = async (handle, param, errorMessage = "Something went wrong, please try again") => {
        if (!isLoggedIn) {
            dispatch(setIsOpenFavoriteModal(true))
        } else {
            setIsFavorite(!isFavorite);

            try {
                dispatch(handle(param));
                const favoritesRequest = await dispatch(getFavorites());
                dispatch(setFavorites(favoritesRequest.data));
            } catch (err) {
                setError(errorMessage);
            }
        }
    }

    const handleLike = async () => {
        reactionFlow(
            addToFavorite,
            id,
            "Something went wrong, when we try to add to favorite, please try again"
        );
    }

    const handleDislike = () => {
        reactionFlow(
            removeFromFavorite,
            id,
            "Something went wrong, when we try to remove from favorite, please try again"
        );
    }

    return (
        <>
            <div
                className="product-like-wrap"
                onClick={isFavorite ? handleDislike : handleLike}
            >
                <Icon
                    name="like"
                    className="product_like"
                    fill={isFavorite ? "#FD7114" : ""}
                />
            </div>
            {!!error && <div className="errors_small">{error}</div>}
        </>
    )
}