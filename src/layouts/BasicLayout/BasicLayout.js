import React from "react";
import { Header } from "src/components/Header/Header";
import { Footer } from "src/components/Footer/Footer";
import "./BasicLayout.css";

export const BasicLayout = ({ children }) => {
    return (
        <div className="basic-layout">
            <Header />
            <main id="page">
                <div className="container">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}