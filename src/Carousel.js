import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  //metodo de React 15, se ejecuta al llamar a render
  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }

  //dataset: propiedad del DOM que crea para los elementos.
  //data-index={index} se convertiría en dataset.index en el dom
  // el this ahi que manejarlo e indicar que es la clase y no la ventana o el this del navegador
  // en el constructor:  this.handleIndexClick = this.handleIndexClick.bind(this)
  // o manejar los eventos como una funcion flecha que recibe el evento:
  // las funcion flecha maneja el scope de manera diferente y no crea uno nuevo si no que se queda en el mismo
  //el this se mantendria en la clase y no en un nuevo scope
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index //+: string parse to int
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              onClick={this.handleIndexClick}
              key={photo.value}
              data-index={index}
              src={photo.value}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
