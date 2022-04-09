import React from 'react';

function Timer(props) {
	return (
		<div className="main__timer">
			Timer: {`0${Math.floor(props.timer / 60000) % 60}`.slice(-2)}:
			{`0${Math.floor(props.timer / 1000) % 60}`.slice(-2)}:
			{`0${Math.floor(props.timer / 10) % 100}`.slice(-2)}
		</div>
	);
}

export default Timer;
