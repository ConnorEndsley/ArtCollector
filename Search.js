import React, { useEffect, useState } from "react";

/**
 * Don't touch these imports!
 */
import {
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults,
} from "../api";

const Search = (props) => {
  // Make sure to destructure setIsLoading and setSearchResults from the props
  const { setIsLoading, setSearchResults } = props;

  const [ centuryList, setCenturyList ] = useState([]);
  const [ classificationList, setClassificationList ] = useState([]);
  const [ queryString, setQueryString ] = useState("");
  const [ century, setCentury ] = useState("any");
  const [ classification, setClassification ] = useState("any");


  useEffect(() => {
    Promise.all([fetchAllCenturies(), fetchAllClassifications()]).then(
      (value) => {
        console.log(value)
        setCenturyList(value[0]);
        setClassificationList(value[1]);
      }
    ).catch((error) => console.error(error));

  }, []);

  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   *
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   *
   * then, in a try/catch/finally block:
   *
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   *
   * catch: error to console.error
   *
   * finally: call setIsLoading, set it to false
   */

  const handleClassificationChange = (event) => setClassification(event.target.value);
  const handleQueryChange = (event) => setQueryString(event.target.value);
  const handleCenturyChange = (event) => setCentury(event.target.value);
  console.log(centuryList);
  console.log(classificationList);

  return (
    <form
      id="search"
      onSubmit={async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
          const response = await fetchQueryResults({
            century,
            classification,
            queryString,
          });

          setSearchResults(response);
        } catch (error) {
          console.error("Error");
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <fieldset>
        <label htmlFor="keywords">Query</label>
        <input
          id="keywords"
          type="text"
          placeholder="enter keywords..."
          value={queryString}
          onChange={handleQueryChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="select-classification">
          Classification <span className="classification-count">( {classificationList.length} )</span>
        </label>
        <select
          name="classification"
          id="select-classification"
          value={classification}
          onChange={handleClassificationChange}
        >
          <option value="any">Any</option>
          {classificationList.map((classification) => {
          return(
            <option value={classification.name}>{classification.name}</option>
          )
        })}
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="select-century">
          Century <span className="century-count">({centuryList.length})</span>
        </label>
        <select
          name="century"
          id="select-century"
          value={century}
          onChange={handleCenturyChange}
        >
          <option value="any">Any</option>
          {/* map over the centuryList, return an <option /> */}
          {centuryList.map((year) => {
            return <option value={year.name}>{year.name}</option>;
          })}
        </select>
      </fieldset>
      <button>SEARCH</button>
    </form>
  );
};
export default Search;
