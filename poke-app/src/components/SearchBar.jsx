
import { useRef, useState } from 'react';
import styles from './Searchbar.module.css'

const SearchBar = (props) => {
  const [isInvalid, setIsInvalid] = useState(false)
  let enteredText = useRef()

  let handleSubmit = (event) => {
    event.preventDefault()

    let searchTerm = enteredText.current.value.toLowerCase()
    if (searchTerm.length < 2) {
      setIsInvalid(true)
      return
    }
    setIsInvalid(false)
    props.search(searchTerm)

    enteredText.current.value = ''
    
  } 

  return (
    <form>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Filter pokemon!"
          ref={enteredText}
        />
        <button type="submit" onClick={handleSubmit} className={styles.button}>
          Filter
        </button>
        {isInvalid ? <div className={styles.error}>Please enter a valid/longer query</div> : '' }
      </div>
    </form>
  );
};

export default SearchBar;
