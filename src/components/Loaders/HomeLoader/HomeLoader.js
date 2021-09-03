import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FilterBar } from "src/components/FilterBar/FilterBar";
import { PRODUCTS_NUMBER } from "src/utils/config";

export const HomeLoader = () => {
    const skeletons = [];

    for (let i = 0; i < PRODUCTS_NUMBER; i++) {
        skeletons.push(
            <div key={i}>
                <SkeletonTheme color="#ccc">
                    <Skeleton width={210} height={213} />
                </SkeletonTheme>
            </div>,
        );
    }

    return (
        <div className="home-page">
            <FilterBar />
            <div className="products">
                {skeletons}
            </div>

            <div className="load-more-wrapper">
                <SkeletonTheme color="#ccc">
                    <Skeleton width={150} height={36} className="load-more-skeleton" />
                </SkeletonTheme>
            </div>
        </div>
    )
}
