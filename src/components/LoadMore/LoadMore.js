import React from "react";
import { Button } from "src/components/Form/Button/Button";
import "./LoadMore.css";

export const LoadMore = ({ handler, params = [] }) => {

    return (
        <Button
            onClick={(e) => handler(e, ...params)}
            style={{
                backgroundColor: "#148DFD",
                width: "auto",
                padding: "6px 33px"
            }}>
            Load more...
        </Button>
    )
}
