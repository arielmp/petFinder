import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";

const petfinder = pf({});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Seattle, Wa",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ""
      },
      this.getBreeds
    ); // se coloca aqui y se utiliza como callback de setState
    // this.getBreeds()   no se pone aqui ya que setstate puede no ejecutarse inmedatamente
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }

  render() {
    //const obj = {name: 'Luis'}
    //<Results path="/" {...obj} /> spread operator: desarma el objeto y lo manda a props
    // lo que este dentro del provider podra usarlo con el consumidor
    return (
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
          <Link to="/search-params">
            <span aria-label="search" role="img">
              🔍
            </span>
          </Link>
        </header>
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));

//Crear con JAVASCRIPT
//React.createElement parametros => 1.etiqueta, 2. atributos (ids,class,eventos), 3. children
// return React.createElement("div", {}, [
//   React.createElement(
//     "h1",
//     { onClick: this.handleTitleClick },
//     "Adopt Me!"
//   ),
//   React.createElement(Pet, {
//     name: "Luna",
//     animal: "Dog",
//     breed: "Havanese"
//   }),
//   React.createElement(Pet, {
//     name: "Pepper",
//     animal: "Bird",
//     breed: "Cocktiel"
//   }),
//   React.createElement(Pet, {
//     name: "Doink",
//     animal: "Cat",
//     breed: "Mixed"
//   })
// ]);

/*

<div>
        <h1>Adopt Me!</h1>
        <Pet name="Luna" animal="dog" breed="Havanese" />
        <Pet name="Pepper" animal="bird" breed="Cockatiel" />
        <Pet name="Doink" animal="cat" breed="Mixed" />
      </div>
//componente como funcion App
const App = () => {
    // componente que se devolvera
    //React.createElement parametros => 1.etiqueta, 2. atributos, 3. children
    return React.createElement("div", {},
        React.createElement('h1', {}, 'Adopt Me!'),
        React.createElement(Pet, {
            name: "Luna",
            animal: 'Dog',
            breed: "Havanese"
        }),
        React.createElement(Pet, {
            name: "Pepper",
            animal: 'Bird',
            breed: "Cocktiel"
        }),React.createElement(Pet, {
            name: "Doink",
            animal: 'Cat',
            breed: "Mixed"
        })
    )
}*/
// renderizar un componente(App) en el elemento id:root del DOM
