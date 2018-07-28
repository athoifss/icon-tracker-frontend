import React from 'react';
import { Link } from 'react-router-dom';

const LinkCell = ({ to, label, aClassName, spanClassName, onClick, pageType }) => {
    if (!!spanClassName) {
        return (
            <Link
                className={aClassName}
                to={`/${pageType}/${to}`}
                onClick={() => { if (typeof onClick === 'function') { onClick() } }}
            >
                <span className={spanClassName}>
                    {label || to}
                </span>
            </Link >
        )        
    }
    else {
        return (
            <Link
                className={aClassName}
                to={`/${pageType}/${to}`}
                onClick={() => { if (typeof onClick === 'function') { onClick() } }}
            >
                {label || to}
            </Link>
        )
    }
}

export default LinkCell;