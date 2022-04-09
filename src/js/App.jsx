import React, { useEffect, useState } from 'react';
import Die from './components/Die.jsx';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Step from './components/Step.jsx';
import Timer from './components/Timer.jsx';

function App() {
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);
	const [step, setStep] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [time, setTime] = useState(0);

	useEffect(
		_ => {
			let interval = null;
			if (isActive) {
				interval = setInterval(_ => {
					setTime(time => time + 10);
				}, 10);
			}

			return _ => clearInterval(interval);
		},
		[isActive]
	);

	useEffect(
		_ => {
			const allHeld = dice.every(die => die.isHeld);
			const firstValue = dice[0].value;
			const allSameValue = dice.every(die => die.value === firstValue);
			dice.some(die => die.isHeld && setIsActive(true));
			if (allHeld && allSameValue) {
				setTenzies(true);
				setIsActive(false);
			}
		},
		[dice]
	);

	function generateNewDie() {
		return { id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false };
	}

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie());
		}
		return newDice;
	}

	function rollDice() {
		setDice(oldDice => oldDice.map(die => (die.isHeld ? die : generateNewDie())));
		setStep(prevStep => prevStep + 1);
		setIsActive(true);
		if (tenzies) {
			setTenzies(false);
			setDice(allNewDice());
			setStep(0);
			setTime(0);
		}
	}

	function holdDice(id) {
		setDice(oldDice =>
			oldDice.map(die => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
		);
	}

	const diceElements = dice.map(die => (
		<Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={_ => holdDice(die.id)} />
	));

	return (
		<main className="main">
			{tenzies && <Confetti />}
			<div className="main__counters">
				<Timer timer={time} />
				<Step stepper={step} />
			</div>
			<h1 className="main__title">Tenzies</h1>
			<p className="main__text">
				Roll until all dice are the same. Click each die to freeze it at its current value
				between rolls.
			</p>
			<div className="main__buttons">{diceElements}</div>
			<button className="button main__button" onClick={rollDice}>
				{tenzies ? 'New Game' : 'Roll'}
			</button>
		</main>
	);
}

export default App;
