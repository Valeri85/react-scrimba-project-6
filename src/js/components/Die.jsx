import React from 'react';

function Die(props) {
	return (
		<button className={props.isHeld ? 'button isHeld' : 'button'} onClick={props.holdDice}>
			{props.value}
		</button>
	);
}

export default Die;
