import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

class SearchBox extends React.Component {
  handleFormSubmit = event => {
    event.preventDefault();
    this.props.search();
  };

  render() {
    // se utiliza una funcion con context para que este en el scope
    // context es el state de App
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="location">
                Location
                <input
                  onChange={context.handleLocationChange}
                  id="location"
                  value={context.location} // 2 way data binding
                  placeholder="Location"
                />
              </label>

              <label htmlFor="animal">
                Animal
                <select
                  id="animal"
                  value={context.animal}
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
                >
                  <option value="">All Animals</option>
                  {ANIMALS.map(animal => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="breed">
                Breed
                <select
                  id="breed"
                  value={context.breed}
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                  disabled={context.breeds.length === 0}
                >
                  <option />
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>

              <button onClick={this.props.search}>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;

//   /* 2 way data binding es diferente que en angular
//     se tiene que manejar el evento que cambia los valores
//     */
//   state = {
//     //    location: "Seattle, Wa", // 2 way data binding

//     breeds: []
//   };
