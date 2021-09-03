import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "src/components/Modal/Modal";
import { NoResults } from "src/components/NoResults/NoResults";
import { setSelectedOrder } from "src/store/actions";
import { selectedOrderSelector } from "src/store/selectors";
import { Order } from "./components/Order/Order";
import { OrderView } from "./components/OrderView/OrderView";
import "./OrdersGrid.css";

export const OrdersGrid = ({ orders }) => {
    const dispatch = useDispatch();
    const selectedOrder = useSelector(selectedOrderSelector);

    const orderModalClose = () => {
        dispatch(setSelectedOrder(null));
    }

    return (
        <>
            <div className="orders">
                {orders.length ? (
                    orders.map((order) => (
                        <Order order={order} key={order.id} />
                    ))
                ) : (
                    <NoResults
                        title="There are no orders items!"
                        description="Try to came back to home page and add continue shopping."
                        extraStyles={{ "margin": "20px auto 0 auto", "max-width": "347px" }}
                    />
                )}
            </div>
            {selectedOrder && (
                <Modal isOpen={selectedOrder} onClose={orderModalClose}>
                    <OrderView selectedOrder={selectedOrder} />
                </Modal>
            )}
        </>
    )
}
