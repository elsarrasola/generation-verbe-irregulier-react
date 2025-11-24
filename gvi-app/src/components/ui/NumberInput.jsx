import '../../assets/styles/numberInput.css';

const NumberInput = ({value, onMinusClick, onPlusClick}) => {
    return (
        <div className="number-control">
            <div className="number-left" onClick={onMinusClick}><div className='btn'></div></div>
                <input type="number" name="number" className="number-quantity" value={value}/>
            <div className="number-right" onClick={onPlusClick}><div className='btn'></div></div>
        </div>
    )
}

export default NumberInput;