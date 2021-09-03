import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { PRODUCTS_NUMBER } from "src/utils/config";
import "./AccountLoader.css";

export const AccountLoader = () => {
    const skeletons = [];


    return (
        <>
            <div className="user_avatar_block">
                <SkeletonTheme color="#ccc">
                    <Skeleton
                        width={88}
                        height={88}
                        circle
                        className="user_avatar_block"
                    />
                </SkeletonTheme>
            </div>
            <div className="user_name">
                <SkeletonTheme color="#ccc">
                    <Skeleton
                        width={103}
                        height={32}
                        className="user_name"
                    />
                </SkeletonTheme>
            </div>
            <div className="tabs_skeleton">
                <SkeletonTheme color="#ccc">
                    <Skeleton width={492} height={75} />
                </SkeletonTheme>
            </div>
            <div className="form_title_wrap">
                <SkeletonTheme color="#ccc">
                    <Skeleton width={140} height={24} />
                </SkeletonTheme>
            </div>
            <div className="account_form">
                <div className="account_form_row">
                    <SkeletonTheme color="#ccc">
                        <Skeleton height={40} />
                    </SkeletonTheme>
                </div>
                <div className="account_form_row">
                    <SkeletonTheme color="#ccc">
                        <Skeleton height={40} />
                    </SkeletonTheme>
                </div>
                <div className="account_form_row">
                    <SkeletonTheme color="#ccc">
                        <Skeleton height={40} />
                    </SkeletonTheme>
                </div>
                <div className="account_form_row">
                    <SkeletonTheme color="#ccc">
                        <Skeleton height={40} />
                    </SkeletonTheme>
                </div>
                <div className="account_form_row">
                    <SkeletonTheme color="#ccc">
                        <Skeleton height={40} />
                    </SkeletonTheme>
                </div>
                <div className="account_form_row">
                    <SkeletonTheme color="#ccc">
                        <Skeleton height={40} />
                    </SkeletonTheme>
                </div>
                <div className="account_form_btn">
                    <SkeletonTheme color="#ccc">
                        <Skeleton height={40} />
                    </SkeletonTheme>
                </div>
            </div>
        </>
    );
}