import { useState} from 'react';
import style from './app.module.css';

const calculatorButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '=', 'C'];

function ButtonCalc(props) {
	const buttonCalculator = calculatorButtons.map((button) => {
		return (
			<button 
        key={button} 
				className={style.calculatorNumbers} 
				onClick = { () => {
					props.onClick(button);
				}}
			>
				{button}
			</button>
		);
	});
	return buttonCalculator;
}

export const App = () => {
	const [display, setDisplay] = useState('');
	const [previousValue, setPreviousValue] = useState(null);
	const [operator, setOperator] = useState(null);
	const [isResult, setResult] = useState(false);

	const handleOnClick = (button) => {
		if (!isNaN(button)) {
			setDisplay((display) => display + button);
		}
		else {
			switch (button) {
				case '+':
				case '-':
					setPreviousValue(Math.round(display));
					setDisplay('');
					setOperator(button);
					setResult(false);
					break;
				case '=':
					if (!operator || previousValue === null) return;
					const currentNumber = Math.round(display);
					let result = 0;
					switch (operator) {
						case '+':
							result = previousValue + currentNumber;
							break;
						case '-':
							result = previousValue - currentNumber;
							break;
						default:
							break;
					}
					setDisplay(result);
					setPreviousValue(null);
					setOperator(null);
					setResult(true);
					break;
				case 'C':
					setDisplay('');
					setPreviousValue(null);
					setOperator(null);
					setResult(false);
					break;
				default:
					break;
			}
		}
	}

	return (
		<div className={style.header}>
			<div className={style.wrapper}>
				<div className={isResult ? style.inputDisplayGreen : style.inputDisplayWhite}>{display}</div>
				<div className={style.dialPad}>
					<ButtonCalc onClick={handleOnClick}/>
			</div>
			</div>
		</div>
	);
};

