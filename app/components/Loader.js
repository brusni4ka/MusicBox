/**
 * Created by kate on 05/01/17.
 */
import React, {Component} from 'react';
import '../../assets/styles/components/loader.css';
const Loader = ()=>(
    <div className="container">
            <div className="row cf">
                    <div className="three col">
                            <div className="loader" id="loader-6">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                            </div>
                    </div>
            </div>
    </div>
);

export default Loader;