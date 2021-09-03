import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedOrder } from "src/store/actions";
import "./Order.css";

export const Order = ({ order }) => {
    const dispatch = useDispatch();
    const { id, totalPrice, createdAt, } = order;

    let date = new Date(createdAt);
    const time = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    const onOrderHandle = () => {
        dispatch(setSelectedOrder(order));
    }

    return (
        <div className="order" onClick={onOrderHandle}>
            <table className="order-table">
                <tbody>
                    <tr>
                        <th>
                            Order ID:
                        </th>
                        <td>{id}</td>
                    </tr>
                    <tr>
                        <th>
                            Date:
                        </th>
                        <td>
                            {time}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="order-price-box">
                <div className="order-price-title">Price</div>
                <div className="order-price-value">$ {totalPrice}</div>
            </div>
        </div>
    )
}