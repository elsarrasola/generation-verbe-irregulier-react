import { useEffect, useState } from 'react'
import ToggleSwitch from './components/ui/ToggleSwitch'
import Table from './components/ui/Table';
import words from './words.json';

function App() {
  const [wordsSelected, setWordsSelected] = useState(words);
  const [selectAll, setSelectAll] = useState(false);
  const [filtres, setFiltres] = useState({
    traduction: true,
    baseVerbale: true,
    preterit: true,
    participePasse: true
  });
  const [columnsToDisplay, setColumnsToDisplay] = useState(["Base verbale", "Preterit", "Participe passe", "Traduction"]);

  const handleToggleChange = (filterName) => {
    setFiltres(prevFiltres => ({
      ...prevFiltres,
      [filterName]: !prevFiltres[filterName]
    }));
  };

  const handleRowSelection = (row) => {
    console.log(row);
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
    if (filtres.preterit) cols.push("Preterit");
    if (filtres.participePasse) cols.push("Participe passe");
    if (filtres.traduction) cols.push("Traduction");
    setColumnsToDisplay(cols);
  }, [filtres]);

  return (
    <>
      <h1>Generateur d'evaluation de verbes irréguliers</h1>
      <p>Selectionnez les verbes evaluer et les colones que vous souhaitez afficher.</p>
      <p>PS: Bon courage pour la correction !</p>
      
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
            <label htmlFor='Preterit'>Preterit</label>
          </li>
          <li>
            <ToggleSwitch isChecked={filtres.participePasse} onChange={() => handleToggleChange("participePasse")} />
            <label htmlFor='Participe passe'>Participe passe</label>
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
    </>
  )
}
export default App
