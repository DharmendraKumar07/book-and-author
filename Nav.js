import React from 'react';
import { Link } from 'react-router-dom';


const Nav=()=>{
    return (
         <div>
             <ul className="nav-ul">
                 <li><Link to="/">Book</Link></li>
                 <li><Link to="/">Author</Link></li>
                 <li><Link to="/add">Add Author</Link></li>
                 <li><Link to="/add">Add Book</Link></li>
                 <li><Link to="/update">Update Book</Link></li>
                 <li><Link to="/profile">profile</Link></li>
                 <li><Link to="/SignUp">SignUp</Link></li>
                 <li><Link to="/login">Login</Link></li>
             </ul>
         </div>
    )

}

export default Nav;