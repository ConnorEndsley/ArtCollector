import React from 'react';

// import queryResults from the URL
import { fetchQueryResultsFromURL } from '../api';

// destructure props into our page to utilize
const Preview = (props) => {

  const {searchResults, setSearchResults, setFeaturedResult, setIsLoading} = props;

  const {info, setInfo} = props.searchResults;
  const {records, setRecords} = props.searchResults;

  // function to gather collection of data from the API using async/await
  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return <aside id="preview">
    <header className="pagination">
      {/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}
      <button 
        disabled={!info.prev}
        className="previous"
        onClick={() => fetchPage(info.prev)}>Previous</button>
      {/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}
      <button
        disabled={!info.next}
        className="next"
        onClick={()=> fetchPage(info.next)}>Next</button>
    </header>
    <section className="results">
        
       {records.map((record, index) => {
          return(
            <div  
            key={ index }
            className="object-preview"
            onClick={(event) => {
              event.preventDefault();
              setFeaturedResult(record);
            }}>
              {record.primaryimageurl?<img src={ record.primaryimageurl } alt={ record.description } />:null}
              
              {record.title?<h3>{ record.title }</h3>:<h3>MISSING FORM</h3>}
           
          </div>
          )
       }
       )}
    </section>
  </aside>
}

export default Preview;