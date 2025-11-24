import '../../assets/styles/pixelButton.css';

const PixelButton = ({label, onClick}) => {
    return (
        <button className="pixel-button" onClick={onClick}>{label}</button>
    )
}

export default PixelButton;