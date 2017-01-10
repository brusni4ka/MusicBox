import {Link} from 'react-router';
import React, {Component} from 'react';

const ToolBar = ({genres})=>(

    <div className="toolbar">
        <div className="container">
            <div className="toolbar-list ">
                { !!genres && genres.map((el, key)=>(
                    <Link to={`/songs/${el}`} key={key} activeClassName="active" className="toolbar-item">{el}</Link>
                ))}
            </div>
        </div>
    </div>
);


export default ToolBar;

