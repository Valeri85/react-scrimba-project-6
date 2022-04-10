import React from 'react';

function Timer(props) {
	return (
		<time
			className="main__counters-timer"
			dateTime={`PT0H${Math.floor(props.timer / 60000) % 60}M${
				Math.floor(props.timer / 1000) % 60
			}.${Math.floor(props.timer / 10) % 100}S`}
		>
			Timer: {`0${Math.floor(props.timer / 60000) % 60}`.slice(-2)}:
			{`0${Math.floor(props.timer / 1000) % 60}`.slice(-2)}:
			{`0${Math.floor(props.timer / 10) % 100}`.slice(-2)}
		</time>
	);
}

export default Timer;
