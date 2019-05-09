import React from "react";
import Pet from "./Pet.js";
import pf from "petfinder-client";
import SearchBox from "./SearchBox";
import { Consumer } from "./SearchContext";

const petfinder = pf({});

//Componente como clases. es lo más usado
class Results extends React.Component {
  //necesario para REACT
  constructor(props) {
    super(props); //pasarle los props al constructor padre (React.component)
    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    this.search();
  }

  //se llama cuando ya se monto en el DOM
  // como utilizar context en metodos
  // funcion flecha porque necesita los props de this
  search = () => {
    petfinder.pet
      .find({
        output: "full",
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets;
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
        // Actualiza el estado del componente
        this.setState({
          pets: pets
        });
      });
  };

  render() {
    // con JSX
    // el return solo puede devolver un elemento por lo que todo se encierra en un div. a menos que se use React.fragment
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed;

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

// como utilizar context dentro de la clase sin que sea en el render
export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  );
}
