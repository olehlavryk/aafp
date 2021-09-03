import React from "react";
import { OrderProduct } from "./../OrderProduct/OrderProduct";
import "./OrderView.css";

export const OrderView = ({ selectedOrder }) => {
    const { id, totalPrice, items, createdAt, shipment } = selectedOrder;

    let date = new Date(createdAt);
    const orderDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    return (
        <div className="order-view">
            <div className="order-view-title">
                Order details ID {id}
            </div>
            <div className="ordered-products">
                {selectedOrder.items.map((order) => {
                    return (
                        <OrderProduct order={order} key={id} />
                    )
                })}
            </div>
            <div className="order-footer">
                <table className="order-footer-left-table">
                    <tbody>
                        <tr>
                            <th>Date:</th>
                            <td>{orderDate}</td>
                        </tr>
                        <tr>
                            <th>Address:</th>
                            <td>{shipment.address}, {shipment.city}, {shipment.country}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="order-footer-right-table">
                    <tbody>
                        <tr>
                            <th>Items:</th>
                            <td>{items.length}</td>
                        </tr>
                        <tr>
                            <th>Total:</th>
                            <td>$ {totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
