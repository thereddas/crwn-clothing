import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
	<div className='header'>
		<Link to='/' className='logo-container'>
			<Logo className='logo' />
		</Link>
		<div className='options'>
			<Link className='option' to='/shop'>SHOP</Link>
			<Link className='option' to='/contact'>Contact</Link>
			{
				currentUser ? ( 
					<div className='option' onClick={() => auth.signOut() }>Sign Out</div> )
				:
					( <Link className='option' to='/signin'>SIGN IN</Link>	)
			}
			<CartIcon />
		</div>
		{ hidden ? null : <CartDropdown /> }
		
	</div>
);

// const mapStateToProps = ({user: {currentUser}, cart: {hidden} }) => {
// 	return {
// 		currentUser: currentUser,
// 		hidden
// 	}
// };

const mapStateToProps = createStructuredSelector({
		currentUser: selectCurrentUser,
		hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);