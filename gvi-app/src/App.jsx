import { useEffect, useState } from 'react'
import ToggleSwitch from './components/ui/ToggleSwitch'
import Table from './components/ui/Table';
import words from './words.json';
import './assets/styles/App.css';
import PixelButton from './components/ui/PixelButton';
import { PDFGeneration, selectRandomWords} from './lib/PDFGeneration';
import NumberInput from './components/ui/NumberInput';

function App() {
    const [wordsSelected, setWordsSelected] = useState(words);
    const [selectAll, setSelectAll] = useState(false);
    const [filtres, setFiltres] = useState({
        traduction: true,
        baseVerbale: true,
        preterit: true,
        participePasse: true,
        melanger: true,
        nombreTrousParLigne: 1
    });
    const [columnsToDisplay, setColumnsToDisplay] = useState(["Base verbale", "Préterit", "Participe passé", "Traduction"]);
    const [maxHoles, setMaxHoles] = useState(3);
    const [minHoles, setMinHoles] = useState(0);

    const handleToggleChange = (filterName) => {
        setFiltres(prevFiltres => ({
            ...prevFiltres,
            [filterName]: !prevFiltres[filterName]
        }));
    };

    const handleRowSelection = (row) => {
        row.isSelected = !row.isSelected;
        setWordsSelected([...wordsSelected]);
        if(wordsSelected.every(word => word.isSelected)) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }
    const handleSelectAll = () => {
        const allSelected = wordsSelected.every(word => word.isSelected);
        const updatedWords = wordsSelected.map(word => ({
            ...word,
            isSelected: !allSelected
        }));
        setWordsSelected(updatedWords);
        setSelectAll(!allSelected);
    }

    useEffect(() => {
        const cols = [];
        if (filtres.baseVerbale) cols.push("Base verbale");
        if (filtres.preterit) cols.push("Préterit");
        if (filtres.participePasse) cols.push("Participe passé");
        if (filtres.traduction) cols.push("Traduction");
        setColumnsToDisplay(cols);
        setMaxHoles(cols.length - 1);
        if(filtres.nombreTrousParLigne > cols.length -1) {
            setFiltres(prevFiltres => ({
                ...prevFiltres,
                nombreTrousParLigne: cols.length -1
            }));
        }
    }, [filtres]);

    const generateSelectionToPDF = () => {
        let words = [];
        wordsSelected.forEach(word => {
            if(word.isSelected) {
                let newWordsRow = selectRandomWords(columnsToDisplay, word, filtres.nombreTrousParLigne);
                words.push(newWordsRow);
            }
        });

        if(filtres.melanger) {
            words = words.sort(() => Math.random() - 0.5);
        }
        const doc = PDFGeneration(columnsToDisplay, words);
        doc.output('pdfobjectnewwindow');
    }

    const addNumberOfHolesPerLine = () => {
        if(filtres.nombreTrousParLigne + 1 <= maxHoles && filtres.nombreTrousParLigne + 1 >= minHoles) {
            setFiltres(prevFiltres => ({
                ...prevFiltres,
                nombreTrousParLigne: filtres.nombreTrousParLigne + 1
            }));
        }
    }

    const reduceNumberOfHolesPerLine = () => {
        if(filtres.nombreTrousParLigne - 1 >= minHoles && filtres.nombreTrousParLigne - 1 <= maxHoles) {
            setFiltres(prevFiltres => ({
                ...prevFiltres,
                nombreTrousParLigne: filtres.nombreTrousParLigne - 1
            }));
        }
    }

    return (
        <>
        <div id="content">
            <aside id="filtres">
                <h2>Filtres</h2>
                <ul id="colonnes-a-afficher">
                    <li>
                        <ToggleSwitch isChecked={filtres.traduction} onChange={() => handleToggleChange("traduction")}/>
                        <label htmlFor='Traduction'>Traduction</label>
                    </li>
                    <li>
                        <ToggleSwitch isChecked={filtres.baseVerbale} onChange={() => handleToggleChange("baseVerbale")}/>
                        <label htmlFor='Base verbale'>Base verbale</label>
                    </li>
                    <li>
                        <ToggleSwitch isChecked={filtres.preterit} onChange={() => handleToggleChange("preterit")} />
                        <label htmlFor='Preterit'>Préterit</label>
                    </li>
                    <li>
                        <ToggleSwitch isChecked={filtres.participePasse} onChange={() => handleToggleChange("participePasse")} />
                        <label htmlFor='Participe passe'>Participe passé</label>
                    </li>
                    <li>
                        <ToggleSwitch isChecked={filtres.melanger} onChange={() => handleToggleChange("melanger")} />
                        <label htmlFor='Participe passe'>Mélanger</label>
                    </li>
                    <li>
                        <label>Nombre de trous par lignes</label>
                        <NumberInput value={filtres.nombreTrousParLigne} onMinusClick={reduceNumberOfHolesPerLine} onPlusClick={addNumberOfHolesPerLine}/>
                    </li>
                    <li id="generer-pdf-button">
                        <PixelButton label="Générer" onClick={() => generateSelectionToPDF()}/>
                    </li>
                </ul>
            </aside>
            <main>
                <Table
                    columnsNames={columnsToDisplay}
                    rows={wordsSelected}
                    onSelection={(e) => handleRowSelection(e)}
                    onSelectAll={handleSelectAll}
                    selectAll={selectAll}
                />
            </main>
        </div>
        </>
    )
}
export default App
