import ToggleSwitch from "./ToggleSwitch";
import '../../assets/styles/table.css';

const Table = ({columnsNames, rows, onSelection, onSelectAll, selectAll}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th><ToggleSwitch isChecked={selectAll} onChange={onSelectAll}/>Tout selectionner</th>
                    {columnsNames.map((colName, index) => (
                        <th key={index}>{colName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td><ToggleSwitch isChecked={row.isSelected} isFor={rowIndex} onChange={() => onSelection(row)}/></td>
                        {columnsNames.map((colName, colIndex) => (
                            <td key={colIndex+rowIndex}>{row[colName]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;