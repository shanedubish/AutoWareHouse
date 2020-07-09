class EditCar extends React.Component {
  state = {
    cars: [],
  };

  // update car
  updateCar = (event) => {
    event.preventDefault();

    const id = event.target.getAttribute("id");
    axios
      .put("/cars/" + id, {
        make: this.state.updateMake,
        img: this.state.updateImage,
        model: this.state.updateModel,
        year: this.state.updateYear,
        description: this.state.updateDescription,
      })
      .then((response) => {
        this.setState({ cars: response.data });

        window.location.reload(false);
      });
    console.log("don't change me !!!");
    console.log(this.props.id);
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
        <form id={this.props.id} onSubmit={this.updateCar}>
          <input onKeyUp={this.updateMake} type="text" placeholder="Make" />
          <br />
          <input onKeyUp={this.updateModel} type="text" placeholder="Model" />
          <br />
          <input onKeyUp={this.updateYear} type="text" placeholder="Year" />
          <br />
          <input
            onKeyUp={this.updateDescription}
            type="text"
            placeholder="Description"
          />
          <br />
          <input
            onKeyUp={this.updateImage}
            type="text"
            placeholder="Image URL"
          />
          <br />
          <input type="submit" value="Edit this Car" />
        </form>
      </div>
    );
  };
}

class AddCar extends React.Component {
  state = {
    cars: [],
    toggle: false,
  };

  // create car
  createCar = (event) => {
    event.preventDefault();
    axios
      .post("/cars", {
        make: this.state.newMake,
        img: this.state.newImage,
        model: this.state.newModel,
        year: this.state.newYear,
        description: this.state.newDescription,
      })
      .then((response) => {
        this.setState({ cars: response.data });
        // console.log(this.state.cars);
        window.location.reload(false);
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

  toggleAddForm = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  render = () => {
    return (
      <div>
        <button className="btn-sm btn-primary" onClick={this.toggleAddForm}>
          Add A Car
        </button>
        {this.state.toggle ? (
          <div>
            <form onSubmit={this.createCar}>
              <input
                onKeyUp={this.makeNewMake}
                type="text"
                placeholder="Make"
              />
              <br />
              <input
                onKeyUp={this.makeNewModel}
                type="text"
                placeholder="Model"
              />
              <br />
              <input
                onKeyUp={this.makeNewYear}
                type="text"
                placeholder="Year"
              />
              <br />
              <input
                onKeyUp={this.makeNewDescription}
                type="text"
                placeholder="Description"
              />
              <br />
              <input
                onKeyUp={this.makeNewImage}
                type="text"
                placeholder="Image URL"
              />
              <br />
              <input
                type="submit"
                value="Create New Car"
                className="btn-sm btn-primary"
              />
            </form>
          </div>
        ) : null}
      </div>
    );
  };
}

class App extends React.Component {
  state = {
    cars: [],
    toggle: false,
  };

  // get cars on page load
  componentDidMount = () => {
    axios.get("/cars").then((response) => {
      this.setState({ cars: response.data });
      // console.log(this.state.cars);
    });
  };

  //  delete car
  deleteCar = (event) => {
    event.preventDefault();
    axios.delete("/cars/" + event.target.value).then((response) => {
      this.setState({ cars: response.data });
    });
    console.log("ouch!!! you deleted me !!!");
  };

  toggleEditForm = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

  render = () => {
    return (
      <div>
        <AddCar />
        <div className="d-flex flex-row justify-content-around flex-wrap">
          {this.state.cars.map((car, i) => {
            return (
              <div key={i} className="card text-center  ">
                <img src={car.img} alt={car.model} className="card-img-top" />
                <h5 className="card-title">
                  {car.year} {car.make} {car.model}
                </h5>
                <p className="card-text">{car.description}</p>
                {/* buttons */}
                <div className="mb-2">
                  <button
                    value={car.id}
                    className="btn-sm btn-primary m-2"
                    onClick={this.toggleEditForm}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={this.deleteCar}
                    value={car.id}
                    className="btn-sm btn-danger m-2"
                  >
                    DELETE
                  </button>
                  {this.state.toggle ? <EditCar id={car.id} /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

ReactDOM.render(<App></App>, document.querySelector("main"));
