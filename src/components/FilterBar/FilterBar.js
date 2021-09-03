import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Form, Formik } from "formik";
import { Select } from "src/components/Form/Select/Select";
import { TextInput } from "src/components/Form/TextInput/TextInput";
import { PRODUCTS_NUMBER } from "src/utils/config";
import { getProductsByCategory, setCurrentCategory, getProductsByQuery, setLoading, setMore, setOffset, setSearch, setStoreProducts, setSort } from "src/store/actions";
import { FilterBarSchema } from "./FilterBarSchema";
import { categoriesSelector, currentCategorySelector, limitSelector, offsetSelector, searchSelector, sortSelector } from "src/store/selectors";
import { getCategories, setCategories, getProducts } from "src/store/actions";
import "./FilterBar.css";

export const FilterBar = () => {
    const dispatch = useDispatch();
    const categories = useSelector(categoriesSelector);
    const category = useSelector(currentCategorySelector);
    const sort = useSelector(sortSelector);
    const search = useSelector(searchSelector);
    const offset = useSelector(offsetSelector);
    const limit = useSelector(limitSelector);
    const [state, setState] = useState({
        errorMessage: null,
    });

    const initCategories = async () => {
        try {
            if (categories.length === 0) {
                const request = await dispatch(getCategories());
                dispatch(setCategories(request.data))
            }
        } catch (err) {
            setState({
                errorMessage: "Something goes wrong! Please try again.",
            });
        }
    }

    useEffect(() => {
        initCategories();
    }, [])

    const initialValues = {
        search: "",
    }

    const handleFlow = async (handler, params = [], errorMessge) => {
        try {
            dispatch(setLoading(true));
            const request = await dispatch(handler(...params));
            dispatch(setStoreProducts(request.data));
            request.data.length < PRODUCTS_NUMBER ? dispatch(setMore(false)) : dispatch(setMore(true));
            dispatch(setOffset(0));
            dispatch(setLoading(false));
        } catch (err) {
            setState({
                errorMessage: errorMessge,
            });
        }
    }

    const onSubmitHandle = useCallback(async (values) => {
        const { search } = values;
        dispatch(setSearch(search));
        handleFlow(
            getProductsByQuery,
            [{ keywords: search, limit: PRODUCTS_NUMBER }],
            "Something goes wrong! Please try again."
        );
    }, [category]);

    const categoryHandle = useCallback(async (e) => {
        dispatch(setCurrentCategory(e.target.value));
        handleFlow(
            getProductsByCategory,
            [{ id: e.target.value }],
            "Invalid category! Please try again."
        );
    }, [category]);

    const sortHandle = useCallback(async (e) => {
        try {
            dispatch(setLoading(true));
            dispatch(setSort(e.target.value));
            const request = await dispatch(getProducts({ offset, limit, sort }));
            dispatch(setStoreProducts(request.data));
            request.data.length < PRODUCTS_NUMBER ? dispatch(setMore(false)) : dispatch(setMore(true));
            dispatch(setOffset(0));
            dispatch(setLoading(false));
        } catch (err) {
            setState({
                errorMessage: "Something goes wrong! Please try again.",
            });
        }

    }, [sort]);

    if (categories.length === 0) {
        return (

            <SkeletonTheme color="#ccc">
                <Skeleton height={61} />
            </SkeletonTheme>

        )
    }

    return (
        <div className="filter-bar">
            <Formik
                initialValues={initialValues}
                validationSchema={FilterBarSchema}
                onSubmit={(values) => onSubmitHandle(values)}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                }) => (
                    <Form className="filter-form">
                        <div className="search-wrapper">
                            <TextInput
                                type="text"
                                name="search"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.search}
                                placeholder="Search products by name"
                                icon="search"
                                className={(errors.search && touched.search) ? "errors_outline search-input" : "search-input"}
                            />
                            {errors.search && touched.search ? (
                                <span className="errors_small">
                                    {errors.search && touched.search && errors.search}
                                </span>
                            ) : null}
                            {!!state.errorMessage && <span className="errors_small">{state.errorMessage}</span>}
                        </div>
                        <Select
                            icon="category"
                            className="category-select"
                            value={category}
                            onChange={(e) => categoryHandle(e)}
                        >
                            <option disabled value={0}>Choose Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </Select>
                        <Select
                            icon="flag"
                            className="sort-select"
                            value={sort}
                            onChange={(e) => sortHandle(e)}
                        >
                            <option disabled>Sorting</option>
                            <option value="latest">Latest</option>
                            <option value="popular">Popular</option>
                        </Select>
                    </Form>
                )
                }
            </Formik>

        </div>
    );
}