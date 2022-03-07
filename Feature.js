import React, { Fragment } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";

const Searchable = (props) => {
  const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;
  return (
    <span className="content">
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          try {
            const response = await fetchQueryResultsFromTermAndValue({
              searchTerm,
              searchValue,
            });

            setSearchResults(response);
          } catch (error) {
            console.error("Error");
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {searchValue}
      </a>
    </span>
  );
};

const Feature = (props) => {
  const { featuredResult, setFeaturedResult, setIsLoading, setSearchResults } =
    props;
  if (!featuredResult) {
    return <main id="feature"></main>;
  } else {
    const {
      title,
      dated,
      images,
      primaryimageurl,
      description,
      culture,
      style,
      technique,
      medium,
      dimensions,
      people,
      department,
      division,
      contact,
      creditline,
    } = featuredResult;
    console.log(featuredResult);
    return (
      <main id="feature">
        <div className="featuredResult-feature">
          <header>
            <h3>{title}</h3>
            <h4>{dated}</h4>
          </header>
          <section className="facts">
            {description ? (
              <div>
                <span className="title"><b>Description: </b></span>
                <span className="content">{description}</span>
              </div>
            ) : null}
            {culture ? (
              <div>
                <span className="title"><b>Culture: </b></span>
                <Searchable
                  searchValue={culture}
                  searchTerm={"culture"}
                  {...props}
                />
              </div>
            ) : null}
            {style ? (
              <div>
                <span className="title"><b>Style: </b></span>
                <span className="content">{style}</span>
              </div>
            ) : null}
            {technique ? (
              <div>
                <span className="title"><b>Technique: </b></span>
                <Searchable
                  searchValue={technique}
                  searchTerm={"technique"}
                  {...props}
                />
              </div>
            ) : null}
            {medium ? (
              <div>
                <span className="title"><b>medium</b></span>
                <Searchable
                  searchValue={medium}
                  searchTerm={"medium"}
                  {...props}
                />
              </div>
            ) : null}
            {dimensions ? (
              <div>
                <span className="title"><b>Dimensions: </b></span>
                <span className="content">{dimensions}</span>
              </div>
            ) : null}
            {people ? (
              <div>
                <span className="title"><b>People: </b></span>
                {people.map((person) => (
                  <Searchable
                    key={person.displayname}
                    searchValue={person.displayname}
                    searchTerm={"person"}
                    {...props}
                  />
                ))}
              </div>
            ) : null}
            {department ? (
              <div>
                <span className="title"><b>Department: </b></span>
                <span className="content">{department}</span>
              </div>
            ) : null}
            {division ? (
              <div>
                <span className="title"><b>Division: </b>Division: </span>
                <span className="content">{division}</span>
              </div>
            ) : null}
            {contact ? (
              <div>
                <span className="title"><b>Contact: </b></span>
                <span className="content">{contact}</span>
              </div>
            ) : null}
            {creditline ? (
              <div>
                <span className="title"><b>Credit: </b></span>
                <span className="content">{creditline}</span>
              </div>
            ) : null}
          </section>

          <section className="photos-render">
            {images.length > 0 ? (
              images.map((image) => {
                return (
                  <img
                    key={image.toString}
                    src={image.baseimageurl}
                    alt={description}
                  />
                );
              })
            ) : (
              <img src={primaryimageurl} alt={description} />
            )}
          </section>
        </div>
      </main>
    );
  }
};

export default Feature;
