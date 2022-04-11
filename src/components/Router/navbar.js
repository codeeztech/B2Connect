import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const Navbar = (props) => {
	// console.log(props)
	// setTimeout(() =>{
	// 	props.history.push('/home')
	// },3000);
	return(
		<nav className='ui raised very padded segment' >
			<a className='ui teal inverted segment' >B2 Connect</a>
			<div className='ui right floated header'>
				
				<button className='ui button'><NavLink to="/home">Data Visualization</NavLink></button>
                <button className='ui button'><Link to="/user">User Management</Link></button>
				<button className='ui button'><NavLink to="/about">About</NavLink></button>
                <button className='ui button'><NavLink to="/logout">Logout</NavLink></button>
				{/* <button className='ui button'><NavLink to="/contact">Contact</NavLink></button> */}
			</div>
		</nav>
	)
}

export default withRouter(Navbar);