import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getProducts,
    getProductsByCategory,
    getProductsByQuery,
    setLoading,
    setMore,
    setOffset,
    setStoreProducts,
    setSelectedProduct,
    setIsOpenFavoriteModal
} from "src/store/actions";
import {
    loadingSelector,
    productsSelector,
    offsetSelector,
    limitSelector,
    sortSelector,
    moreSelector,
    searchSelector,
    currentCategorySelector,
    isLoggedSelector,
    isOpenFavoriteModalSelector,
    selectedProductSelector,
} from "src/store/selectors";
import { Product } from "src/components/Product/Product";
import { FilterBar } from "src/components/FilterBar/FilterBar";
import { PRODUCTS_NUMBER } from "src/utils/config";
import { HomeLoader } from "src/components/Loaders/HomeLoader/HomeLoader";
import { LoadMore } from "src/components/LoadMore/LoadMore";
import { Modal } from "src/components/Modal/Modal";
import { UserActions } from "src/components/UserActions/UserActions";
import { ProductView } from "src/components/ProductView/ProductView";
import "./Home.css";


export const Home = () => {
    const loading = useSelector(loadingSelector);
    const dispatch = useDispatch();
    const products = useSelector(productsSelector);
    const offset = useSelector(offsetSelector);
    const limit = useSelector(limitSelector);
    const sort = useSelector(sortSelector);
    const showMore = useSelector(moreSelector);
    const search = useSelector(searchSelector);
    const currentCategory = useSelector(currentCategorySelector);
    const isOpenFavoriteModal = useSelector(isOpenFavoriteModalSelector);
    const isLoggedIn = useSelector(isLoggedSelector);
    const isSelectedProduct = useSelector(selectedProductSelector);


    const [state, setState] = useState({
        errorMessage: null,
    });


    const initProducts = async () => {
        try {
            dispatch(setLoading(true));
            const request = await dispatch(getProducts({ offset: offset, limit: limit, sort: sort }));
            dispatch(setStoreProducts(request.data));
            request.data.length < PRODUCTS_NUMBER ? dispatch(setMore(false)) : dispatch(setMore(true));
            dispatch(setLoading(false));
        } catch (err) {
            setState({
                errorMessage: "Something goes wrong! Please try again.",
            });
        }
    }

    useEffect(() => {
        initProducts();
    }, [isLoggedIn]);


    const getProductsFlow = async (handler, params = [], errorMessge) => {
        try {
            dispatch(setLoading(true));
            dispatch(setOffset(offset + PRODUCTS_NUMBER));
            const request = await dispatch(handler(...params));
            dispatch(setStoreProducts([...products, ...request.data]));
            request.data.length < PRODUCTS_NUMBER ? dispatch(setMore(false)) : dispatch(setMore(true));
            dispatch(setLoading(false));
        } catch (err) {
            setState({
                errorMessage: errorMessge,
            });
        }
    }

    const pureLoadMore = useCallback(async (e) => {
        e.preventDefault();
        getProductsFlow(
            getProducts,
            [{ offset: offset + PRODUCTS_NUMBER, limit: limit, sort: sort }],
            "Something goes wrong! Please try again."
        );
    }, [offset, limit, sort, products]);

    const categoryLoadMore = useCallback(async (e, category) => {
        e.preventDefault();
        getProductsFlow(
            getProductsByCategory,
            [{ id: category, offset: offset + PRODUCTS_NUMBER, limit: limit, sort: sort }],
            "Something goes wrong! Please try again."
        )
    }, [offset, limit, sort, products])

    const searchLoadMore = useCallback(async (e) => {
        e.preventDefault();
        getProductsFlow(
            getProductsByQuery,
            [{ keywords: search, offset: offset + PRODUCTS_NUMBER, limit: limit }],
            "Something goes wrong! Please try again."
        )
    }, [offset, limit, sort, products]);


    const productModalClose = () => {
        dispatch(setSelectedProduct(null));
    }

    const favoriteModalClose = () => {
        dispatch(setIsOpenFavoriteModal(false));
    }

    if (loading) {
        return <HomeLoader />
    }


    return (
        <div className="home-page">
            <FilterBar />
            {!!state.errorMessage && <span className="errors_small">{state.errorMessage}</span>}
            <div className="products">
                {products.length > 1 ? (
                    products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                ) : (
                    <div className="products-not-found">Products not found!</div>
                )}
            </div>

            <div className="load-more-wrapper">
                {showMore && currentCategory > 0 && (
                    <LoadMore handler={categoryLoadMore} params={[currentCategory]} />
                )}

                {showMore && currentCategory === 0 && !search && (
                    <LoadMore handler={pureLoadMore} />
                )}

                {showMore && search && !currentCategory && (
                    <LoadMore handler={searchLoadMore} />
                )}
            </div>

            {
                !isLoggedIn && isOpenFavoriteModal && (
                    <Modal isOpen={!isLoggedIn && isOpenFavoriteModal} onClose={favoriteModalClose}>
                        <UserActions />
                    </Modal>
                )
            }

            {isSelectedProduct && (
                <Modal isOpen={isSelectedProduct} onClose={productModalClose}>
                    <ProductView product={isSelectedProduct} />
                </Modal>
            )}


        </div>
    )
}