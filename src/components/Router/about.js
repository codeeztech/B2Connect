import React from 'react';
import Navbar from './navbar';

const About = () => {
	return(
		<div>
			<Navbar></Navbar>
			<div 
				className='ui raised very padded text container segment'
				style={{marginTop:'80px'}} 
			>
				<h3 className='ui header'>About</h3>
				<p>From B2 Connect - test is performed by Mr. Muhammad Shahroz Khan for the position of Full stack developer.</p>
			</div>
		</div>
	)
}

export default About;