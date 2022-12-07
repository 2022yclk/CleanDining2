import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './../../assets/logo_resize.jpg'
import './../../css/AdminStyle.css'

function Header(props) {
    return (
        <div className="header">
            {props.isManager ?
                <>
                    <Link to="/manager/resvview" className="toHome" title="처음으로"><img class="logo" src={logoImage} alt="CleanDining"/></Link>
                    <div style={{position: 'absolute', right: '60px', padding: '10px 0', fontSize: '12px'}}>
                        관리자님, 안녕하세요 :)
                    </div>
                </> : 
                <>
                            
                </>
            }
        </div>
    );
};

export default Header;