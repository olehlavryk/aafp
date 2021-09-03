import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedSelector, cartCounterSelector, selectedProductSelector, productsSelector } from "src/store/selectors";
import { Button } from "src/components/Form/Button/Button";
import {
    setIsOpenFavoriteModal,
    setSelectedProduct,
    setCartCounter,
    setNotification,
    getFavorites,
    setFavorites,
    addToFavorite,
    removeFromFavorite,
    setStoreProducts,
    setLoading
} from "src/store/actions";
import { generatePath, useHistory } from "react-router";
import { ProductQtty } from "../ProductQtty/ProductQtty";
import { addEntry } from "src/utils/common";
import "./ProductView.css";

export const ProductView = ({ product }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(isLoggedSelector);
    const cartCounter = useSelector(cartCounterSelector);
    const seledtedProduct = useSelector(selectedProductSelector);
    const products = useSelector(productsSelector);
    const { id, title, description, picture, price, favorite } = product;

    const [error, setError] = useState(null);
    const [qtty, setQtty] = useState(1);

    const minusHandle = useCallback(() => {
        if (qtty <= 1) return;

        setQtty(qtty - 1);
    }, [qtty]);

    const plusHandle = useCallback(() => {
        setQtty(qtty + 1);
    }, [qtty]);

    const addToCartHandle = useCallback(() => {
        if (!isLoggedIn) {
            dispatch(setSelectedProduct(null));
            dispatch(setIsOpenFavoriteModal(true));
        } else {
            const notification = `The <span>${title}</span> is successfully added to cart`;
            addEntry({ qtty, product });
            dispatch(setCartCounter(cartCounter + 1));
            dispatch(setSelectedProduct(null));
            dispatch(setNotification(notification));
        }
    }, [isLoggedIn, product, qtty, cartCounter, title]);

    const buyNowHandle = useCallback(() => {
        addEntry({ qtty, product });
        dispatch(setCartCounter(cartCounter + 1));
        dispatch(setSelectedProduct(null));
        history.push(generatePath("/cart"));
    }, [product, qtty, cartCounter]);

    const reactionFlow = async (handle, param, errorMessage = "Something went wrong, please try again") => {
        try {
            dispatch(handle(param));
            const favoritesRequest = await dispatch(getFavorites());
            dispatch(setFavorites(favoritesRequest.data));

            const data = {
                ...seledtedProduct,
                favorite: !seledtedProduct.favorite
            }
            dispatch(setSelectedProduct(data));

            const changedProducts = products.map(product =>
                product.id === seledtedProduct.id
                    ? { ...product, favorite: !product.favorite }
                    : product
            );
            dispatch(setLoading(true));
            dispatch(setStoreProducts(changedProducts));
            dispatch(setLoading(false));

        } catch (err) {
            setError(errorMessage);
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
        <div className="product-view">
            <div className="top-section">
                <div className="image-preview-wrapper">
                    <img src={picture || ""} alt={title} className="image-preview" />
                </div>
                <div className="product-info">
                    <h3 className="product-title">{title}</h3>
                    <div className="product-description">
                        {description}
                    </div>
                    <div className="product-price">
                        <div className="price-title">Price</div>
                        <div className="price">${price}</div>
                    </div>
                    <div className="product-qtty">
                        <ProductQtty minusHandle={minusHandle} qtty={qtty} plusHandle={plusHandle} />
                    </div>
                    <table className="total-table">
                        <tbody>
                            <tr>
                                <th className="qtty-title">Items:</th>
                                <td className="qtty">{qtty}</td>
                            </tr>
                            <tr>
                                <th className="qtty-title">Total:</th>
                                <td className="qtty">${qtty * price}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bottom-section">
                <div className="secondary-btns">
                    <Button
                        type="outline"
                        className="add-to-cart-btn"
                        onClick={addToCartHandle}
                    >
                        Add to cart
                    </Button>
                    {!favorite ? (
                        <Button
                            type="outline"
                            className="prodcuct-reactions-btn"
                            onClick={handleLike}
                        >
                            Add to Favorites
                        </Button>
                    ) : (
                        <Button icon="okey" onClick={handleDislike}>
                            Added to Favorites
                        </Button>
                    )}
                    {!!error && <div className="errors_small">{error}</div>}
                </div>

                <Button
                    className="buy-btn"
                    onClick={buyNowHandle}
                >
                    Buy now
                </Button>
            </div>
        </div>
    )
}