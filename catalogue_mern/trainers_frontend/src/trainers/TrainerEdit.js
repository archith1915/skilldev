import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LoggedInHeader from "../header/LoggedInHeader";
import trainersService from "../services/TrainersService";

function TrainerEdit() {
  const initTrainer = {
    name: "",
    author: "",
    publisher: "",
    number_of_copies: "",
    price: "",
  };
  const [trainer, setTrainer] = useState(initTrainer);
  const params = useParams();
  const navigate = useNavigate();

  const callToReadTrainerById = async function () {
    const axiosResponse = await trainersService.readOne(params.id);
    const json = axiosResponse.data;

    setTrainer(json.data);
  };

  useEffect(() => {
    callToReadTrainerById();
  }, []);

  const onTextChange = function (event) {
    const changedTrainer = { ...trainer };
    changedTrainer[event.target.id] = event.target.value;
    setTrainer(changedTrainer);
  };
  const doUpdateTrainer = function (event) {
    if (
      !window.confirm(`Are you sure to update the trainer '${trainer.name}'?`)
    ) {
      return;
    }
    const axiosResponse = trainersService.update(params.id, {
      name: trainer.name,
      author: trainer.author,
      publisher: trainer.publisher,
      number_of_copies: trainer.number_of_copies,
      price: trainer.price,
    });

    alert("Trainers is updated successfully.");
    navigate("/trainers/list");
    console.log(`${trainer.name} has been updated successfully`);
  };

  return (
    <>
      {" "}
      <LoggedInHeader />
      <div>
        <a href="/trainers/list" className="btn btn-dark">
          &lt;&lt;Go Back
        </a>
        <h3>Edit entry</h3>

        <div class="container">
          <div className="form-group">
            <label htmlFor="name">trainer name</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              id="name"
              aria-describedby="nameHelp"
              placeholder="Enter trainer name"
              value={trainer.name}
              onChange={onTextChange}
            />
            <small id="nameHelp" className="form-text text-muted">
              Please enter name.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="location">author</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              id="location"
              aria-describedby="locationHelp"
              data-bs-theme="light"
              placeholder="Enter trainer location"
              value={trainer.author}
              onChange={onTextChange}
            />
            <small id="locationHelp" className="form-text text-muted">
              Please enter author.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="technology">publisher</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              data-bs-theme="dark"
              id="technology"
              aria-describedby="technologyHelp"
              placeholder="Enter trainer technology"
              value={trainer.publisher}
              onChange={onTextChange}
            />
            <small id="technologyHelp" className="form-text text-muted">
              Please enter publisher.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">number of copies</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              data-bs-theme="light"
              id="phone_number"
              aria-describedby="phone_numberHelp"
              placeholder="Enter trainer phone_number"
              value={trainer.number_of_copies}
              onChange={onTextChange}
            />
            <small id="phone_numberHelp" className="form-text text-muted">
              Please enter number of copies.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="phone_number">price</label>
            <input
              type="text"
              className="form-control bg-dark text-light bg-dark text-light"
              id="price"
              aria-describedby="phone_numberHelp"
              placeholder="Enter trainer phone_number"
              value={trainer.price}
              onChange={onTextChange}
            />
            <small id="phone_numberHelp" className="form-text text-muted">
              Please enter price.
            </small>
          </div>

          <button
            type="button"
            class="btn btn-warning"
            onClick={doUpdateTrainer}
          >
            Update Trainer
          </button>
        </div>
      </div>
    </>
  );
}

export default TrainerEdit;
