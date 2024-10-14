# Test assunzione frontend

Esercizio da utilizzare durante le sessioni di assunzioni per testare le conoscenze in React del candidato.

## Domande

1. Inserisci un input testuale, replica (in tempo reale) il testo contenuto nel campo di testo sotto di esso
	a. Stilizzalo per renderlo carino (puoi prendere riferimento l'immagine di esempio)
	b. Mostra un testo diverso in caso non si stato inserito nulla (se son inseriti solo spazi considerali una stringa vuota)
	c. Se ci immaginassimo che la callback, anzichè andare ad aggiornare semplicemente lo state, dovesse effettuare un elaborazione più impegnativa (es. barra di ricerca), cambieresti qualcosa? \[debounce]
	d. Ti viene in mente anche un altra possibile soluzione per ottenere il riferimento al testo attuale? [usare un ref oppure usare l'event nella callback dell'onChange]

2. Aggiungi un bottone a fianco dell'input testuale, ogni volta che viene premuto viene aggiunta la stringa in una lista da mostrare sotto, e l'input di testo deve svuotarsi
	a. Stilizzalo per renderlo carino (puoi prendere riferimento l'immagine di esempio)
	b. Che ruolo ha `key` come attributo nel renderizzare la lista di elementi? \[performance] Qual è il modo ottimale per assegnarlo? 
	c. Disabilita il bottone fin tanto che non c'è qualche carattere digitato (anche qui solo spazi = stringa vuota)

3. \[avanzato!] Fai in modo che ogni elemento della lista sia cliccabile, e quando viene cliccato l'elemento **precedente** cambia colore (il primo elemento colora l'ultimo)

## Soluzione

```jsx
import { type ChangeEventHandler, type MouseEventHandler, type ReactNode, useCallback, useRef, useState } from 'react';

export default function Assignment(): ReactNode {
  const [text, setText] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const [list, setList] = useState<string[]>([]);

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setText(e.target.value.trim());
  }, []);

  const onAdd = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
    e.preventDefault();
    if (!text) {
      return;
    }

    const input = inputRef.current;
    if (input) {
      input.value = '';
    }
    setList(p => [...p, text]);
    setText('');
  }, [text]);

  const listRefs = useRef<(HTMLLIElement | null)[]>([]);

  const onElementClick = useCallback((index: number) => {
    const el = listRefs.current[index > 0 ? index - 1 : list.length - 1];
    if (!el) {
      return;
    }
    el.classList.toggle('bg-red-500');
  }, [list]);

  return (
    <>
      <div className="text-xs font-bold text-gray-600">Inserisci l'elemento da aggiungere</div>
      <div className="flex flex-row items-center justify-center gap-2">
        <input
          ref={inputRef}
          className="bg-gray-200 px-4 py-2 rounded-md w-full outline-none"
          type="text"
          placeholder="Digita qui..."
          onChange={onChange}
        />
        <button type="button" className={`rounded-md bg-red-500 text-white px-4 py-2 ${!text ? 'opacity-40 hover:cursor-default' : ''}`} onClick={onAdd}>
          Aggiungi
        </button>
      </div>
      <div className="mt-4">
        <span className="font-bold text-gray-600 mr-1">Testo inserito:</span>
        {text || <span className="italic text-gray-400">Non è stato digitato nessun testo.</span>}
      </div>
      <div className="mt-4">
        <div className="font-bold text-gray-600">Lista degli elementi inseriti:</div>
        <ul className="list-disc ml-6">
          {list.map((el, i) => <li ref={r => listRefs.current[i] = (r)} onClick={() => onElementClick(i)} key={el}>{el}</li>)}
        </ul>
      </div>
    </>
  );
}

```
