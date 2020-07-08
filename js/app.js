class App extends React.Component {
  state = { cars: [] };

  // get cars on page load

  componentDidMount = () => {
    axios.get("/cars").then((response) => {
      this.setState({ cars: response.data });
      console.log(this.state.cars);
    });
  };

  // create car
  createCar = (event) => {
    event.preventDefault();
    axios
      .post("/cars", {
        make: this.state.newMake,
        image: this.state.newImage,
        model: this.state.newModel,
        year: this.state.newYear,
        description: this.state.newDescription,
      })
      .then((response) => {
        this.setState({ cars: response.data });
        console.log(this.state.cars);
      });
  };
  makeNewMake = (event) => {
    this.setState({ newMake: event.target.value });
  };
  makeNewImage = (event) => {
    this.setState({ newImage: event.target.value });
  };
  makeNewModel = (event) => {
    this.setState({ newModel: event.target.value });
  };
  makeNewYear = (event) => {
    this.setState({ newYear: event.target.value });
  };
  makeNewDescription = (event) => {
    this.setState({ newDescription: event.target.value });
  };

  //  delete car

  deleteCar = (event) => {
    event.preventDefault();
    axios.delete("/cars/" + event.target.value).then((response) => {
      this.setState({ cars: response.data });
    });
    console.log("ouch!!! you deleted me !!!");
  };

  // update car
  updateCar = (event) => {
    event.preventDefault();

    const id = event.target.getAttribute("id");
    axios
      .put("/cars/" + id, {
        make: this.state.updateMake,
        image: this.state.updateImage,
        model: this.state.updateModel,
        year: this.state.updateYear,
        description: this.state.updateDescription,
      })
      .then((response) => {
        this.setState({ cars: response.data });
      });
    console.log("don't change me !!!");
  };
  updateMake = (event) => {
    this.setState({ updateMake: event.target.value });
  };
  updateModel = (event) => {
    this.setState({ updateModel: event.target.value });
  };
  updateImage = (event) => {
    this.setState({ updateImage: event.target.value });
  };
  updateYear = (event) => {
    this.setState({ updateYear: event.target.value });
  };
  updateDescription = (event) => {
    this.setState({ updateDescription: event.target.value });
  };

  render = () => {
    return (
      <div>
        {this.state.cars.map((car, i) => {
          return (
            <div key={i}>
              <h2>{car.make}</h2>
              <h2>{car.model}</h2>
              <img src={car.img} alt={car.model} />
              <h2>{car.year}</h2>
              <h2>{car.description}</h2>
            </div>
          );
        })}
      </div>
    );
  };
}
ReactDOM.render(<App></App>, document.querySelector("main"));
