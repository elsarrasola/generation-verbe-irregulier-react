import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

export function PDFGeneration(columnsNames, rows) {
    const doc = new jsPDF();
    autoTable(doc, {
        head: [columnsNames],
        body: rows.filter(row => row.isSelected).map(row => {
            let rowData = [];
            columnsNames.map(colName => {
                rowData.push(row[colName]);
            })
            return rowData;
        })
    });
    return doc;
}

export function selectRandomWords(words, count) {
    let keys = Object.keys(words);
    let workWords = {};
    keys.forEach((key) => {
        workWords[key] = words[key];
    });

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