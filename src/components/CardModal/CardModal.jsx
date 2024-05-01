import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./CardModal.css";

const CardModal = ({ setShowModal, handleNewCardCreation }) => {
    // generate unique id
    const cardId = uuid();

    // state to track user input
    const [data, setData] = useState({
        title: "",
        description: "",
        column: "",
    });

    // error states for each input field
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [columnError, setColumnError] = useState(false);

    // function for on change event for each input fields
    const handleInputChange = (e) => {
        setTitleError(false);
        setDescriptionError(false);
        setColumnError(false);
        setData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    function onlyLettersAndSpaces(str) {
        return /^[A-Za-z\s]*$/.test(str);
    }

    // function to submit the form when user click on 'Add Card' button
    const handleCardSubmission = (e) => {
        e.preventDefault();

        // VALIDATE TITLE
        // Case 1: if title empty show error
        if (data.title === "") {
            return setTitleError(true);
        }
        // Case 2: if title is not empty then we check if its valid or not
        const checkTitle = onlyLettersAndSpaces(data.title);
        // if not valid return with error else proceed
        if (!checkTitle) {
            return setTitleError(true);
        }

        // VALIDATE DESCRIPTION
        // Case 1: If empty or less than 25 words show error else proceed
        const descriptionLetterCount = data.description.length;
        if (descriptionLetterCount < 25) {
            return setDescriptionError(true);
        }

        // VALIDATE COLUMN
        // Case 1: If column valuse not selected show error else proceed
        if (data.column === "") {
            return setColumnError(true);
        }

        const newData = { ...data, cardId };
        handleNewCardCreation(newData, data.column);

        setTitleError(false);
        setDescriptionError(false);
        setColumnError(false);
        setData({
            title: "",
            description: "",
            column: "",
        });
        setShowModal(false);
    };

    return (
        <div className="card-modal">
            <div className="input-form">
                <div className="input-container">
                    <label htmlFor="title">title:</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="enter a title"
                        name="title"
                        value={data.title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    {titleError && (
                        <p className="error">
                            Error: Title cannot be empty and should only contain
                            alphabets.
                        </p>
                    )}
                </div>
                <div className="input-container">
                    <label htmlFor="description">description:</label>

                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="7"
                        placeholder="enter description"
                        value={data.description}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    {descriptionError && (
                        <p className="error">
                            Error: Make sure description is more than 25
                            letters.
                        </p>
                    )}
                </div>
                <div className="input-container">
                    <label htmlFor="column">select column:</label>
                    <select
                        id="column"
                        name="column"
                        value={data.column}
                        onChange={handleInputChange}
                    >
                        <option
                            value=""
                            defaultValue={data.column}
                            disabled
                            hidden
                        >
                            Choose here
                        </option>
                        <option value="pending">pending</option>
                        <option value="working">working</option>
                        <option value="completed">completed</option>
                    </select>
                    {columnError && (
                        <p className="error">Error: Please select a column.</p>
                    )}
                </div>
                <div className="button-container">
                    <button onClick={() => setShowModal(false)}>cancel</button>
                    <button
                        onClick={handleCardSubmission}
                        disabled={
                            titleError || descriptionError || columnError
                                ? true
                                : false
                        }
                        style={
                            titleError || descriptionError || columnError
                                ? {
                                      backgroundColor: "lightgray",
                                      cursor: "not-allowed",
                                  }
                                : {}
                        }
                    >
                        add card
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardModal;
