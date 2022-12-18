import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { component } from './navbar.reducer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './navbar.component.css';

const Navbar = () => {
    const componentSelected = useSelector(component);
    const navigate = useNavigate();

    const items = [
        {
            id: "navbar-item-proximity",
            name: "Proximity",
            route: "/mapsdemo/"
        },
        {
            id: "navbar-item-audience",
            name: "Audience",
            route: "/mapsdemo/"
        }
    ];

    const removeActive = () => {
        let items = document.getElementsByClassName('navbar-active');
        for(let i = 0; i < items.length; i++)
            items[i].classList.remove('navbar-active');
    }

    const navigateTo = (route) => {
        removeActive();
        navigate(route);
    }

    useEffect(() => {
        let item = items.find(item => item.name === componentSelected);
        if(item){
            removeActive();
            document.getElementById(item.id).classList.add('navbar-active');
        }
    });
    return(
        <nav id='navbar' className="col-12 h-100 d-flex flex-row">
            <div id="navbar-title" className="col-2 d-flex justify-content-start align-items-center px-4">
                <span id='navbar-title-span'>Map/demo</span>
            </div>
            <section id="navbar-items" className="col-8 d-flex justify-content-center align-items-center py-0 h-100">
                <ul id="navbar-list" className="col-4 d-flex justify-content-evenly h-100">
                    {items.map((item, i) => 
                        <li id={item.id} key={i} className="h-100 d-flex align-items-center navbar-item pointer" onClick={() => navigateTo(item.route)}>{item.name}</li>
                    )}
                </ul>
            </section>
            <div id="navbar-account" className="col-2 d-flex justify-content-center align-items-center p-0">
                <div className='p-2 pointer'>
                    <span id='navbar-account-span'>My Account</span>
                    <FontAwesomeIcon id='navbar-account-icon' icon={faChevronDown}/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;