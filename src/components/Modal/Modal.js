import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { Icon } from "../Icons/Icon";
import "./Modal.css";

export const Modal = ({
    isOpen,
    children,
    onClose
}) => {

    const useOutsideClick = (ref) => {
        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    onClose();
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const modalRef = useRef(null);
    useOutsideClick(modalRef);

    return (
        isOpen && ReactDOM.createPortal(
            <div className="ModalWrapper" >
                <div className="Modal" ref={modalRef}>
                    {children}
                    <div className="modal-close" onClick={onClose}>
                        <Icon name="modalClose" />
                    </div>
                </div>
            </div>,
            document.getElementById("modal")
        )
    )
}