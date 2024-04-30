import "./AddNewCard.css";

const AddNewCard = ({ setShowModal }) => {
    return (
        <nav>
            <span>Planner board</span>
            <button onClick={() => setShowModal(true)}>add card</button>
        </nav>
    );
};

export default AddNewCard;
