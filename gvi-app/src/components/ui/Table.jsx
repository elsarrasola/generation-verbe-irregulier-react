import ToggleSwitch from "./ToggleSwitch";
import '../../assets/styles/table.css';

const Table = ({columnsNames, rows, onSelection, onSelectAll, selectAll}) => {
    return (
        <table id="table-verbes">
            <thead>
                <tr>
                    <th id="premiere-colonne-entete">
                        <div  id="tout-selectionner-entete">
                            <ToggleSwitch
                                isChecked={selectAll}
                                onChange={onSelectAll}
                            />
                            <span 
                                style={{marginLeft: '10px'}}
                            >
                                Tous
                            </span>
                        </div>
                    </th>
                    {columnsNames.map((colName, index) => (
                        <th key={index}>{colName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={(rowIndex % 2) ? "paire" : "unpaire"}>
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