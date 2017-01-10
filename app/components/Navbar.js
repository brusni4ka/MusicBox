/**
 * Created by kate on 26/12/16.
 */
import {Link} from 'react-router';
import React, {Component} from 'react';

const NavBar = ()=>(
        <div className=" navbar-inverse " role="navigation">
            <div className="container">
                <a className="navbar-brand" href="#">MusicBox</a>

                <ul className="nav navbar-nav pull-right">
                    <li className="active"><a href="#">Login</a></li>
                </ul>
            </div>
        </div>
);


export default NavBar;

