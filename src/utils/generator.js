import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { BasicLayout } from "src/layouts/BasicLayout/BasicLayout";
import { Home } from "src/pages/Home/Home";
import { Register } from "src/pages/Register/Register";
import { Login } from "src/pages/Login/Login";
import { Cart } from "src/pages/Cart/Cart";
import { NotFound } from "src/pages/NotFound/NotFound";
import { Account } from "src/pages/Account/Account";

export const routesConfig = [
    {
        layout: BasicLayout,
        routes: [
            ["/", Home, true],
            ["/register", Register],
            ["/login", Login],
            ["/cart", Cart],
            ["/account", Account],
            ["*", NotFound],
        ]
    }
];

export const RoutesGenerator = ({ config }) => (
    <BrowserRouter>
        <Switch>
            {config.map(({ layout: Layout, routes }) => (
                <Route
                    key={routes[0][0]}
                    path={routes.map(([firstEl]) => firstEl)}
                >
                    <Layout>
                        <Switch>
                            {
                                routes.map(([path, Component, exact]) => (
                                    <Route {...{ path, exact }} key={path}>
                                        <Component />
                                    </Route>
                                ))
                            }
                        </Switch>
                    </Layout>
                </Route>
            ))}
        </Switch>
    </BrowserRouter>
);