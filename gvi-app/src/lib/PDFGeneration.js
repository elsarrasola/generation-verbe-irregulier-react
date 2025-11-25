import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function PDFGeneration(columnsNames, rows) {
    const doc = new jsPDF();
    autoTable(doc, {
        theme: 'grid',
        styles: { lineColor: "#000000", lineWidth: 0.1, textColor: "#000000" },
        headStyles: { fillColor: "#e7e9ed", textColor: "#000000", lineColor: "#000000", lineWidth: 0.1 },
        head: [columnsNames],
        body: rows.filter(row => row.isSelected).map(row => {
            let rowData = [];
            columnsNames.map(colName => {
                rowData.push(upperCaseFirstLetter(row[colName]));
            })
            return rowData;
        })
    });
    return doc;
}

export function selectRandomWords(columnsNames, words, count) {
    let workWords = {
        isSelected: words["isSelected"]
    };
    columnsNames.forEach((col) => {
        workWords[col] = words[col];
    });
    
    let keys = Object.keys(workWords);
    let numberOfSelectedWords = 0;
    let selectedKeys = [];
    while(numberOfSelectedWords < count) {
        let selectedKey = keys[Math.floor(Math.random() * keys.length)];
        if(selectedKey != "isSelected" && !selectedKeys.includes(selectedKey)) {
            selectedKeys.push(selectedKey);
            numberOfSelectedWords++;
        }
    }

    keys.forEach((key) => {
        if(selectedKeys.includes(key)) {
            workWords[key] = "";
        }
    });
    return workWords;
}