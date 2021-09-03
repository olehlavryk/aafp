import React from "react";
import { NoResults } from "src/components/NoResults/NoResults";
import { Product } from 'src/components/Product/Product';
import "./FavoritesGrid.css";

export const FavoritesGrid = ({ favorites }) => {

    return (
        <div className="favorites">
            {favorites.length ? (
                favorites.map((product) => (
                    <Product key={product.id} product={product} />
                ))
            ) : (
                <NoResults
                    title="There are no favorites items!"
                    description="Try to came back to home page and add continue shopping."
                    extraStyles={{ "margin": "20px auto 0 auto", "max-width": "347px" }}
                />
            )}
        </div>
    )
}
