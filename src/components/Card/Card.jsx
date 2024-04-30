import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import "./Card.css";

const Card = ({
    card,
    setShowEditModal,
    columnName,
    deleteCard,
    editCard,
    handleDragEnter,
    handleDragEnd,
}) => {
    const handleDeleteCard = (cardId, colName) => {
        deleteCard(cardId, colName);
    };

    const handleEditCard = (cardDetails, colName) => {
        editCard({ ...cardDetails, colName });
        setShowEditModal(true);
    };

    return (
        <>
            <div
                className="card"
                onClick={() => handleEditCard(card, columnName)}
                draggable
                onDragEnter={() => handleDragEnter(card?.cardId, columnName)}
                onDragEnd={() => handleDragEnd(card?.cardId, columnName)}
            >
                <div className="top">
                    <h2>{card.title}</h2>
                    <div className="icon-container">
                        <MdDeleteOutline
                            onClick={() =>
                                handleDeleteCard(card.cardId, columnName)
                            }
                        />
                    </div>
                </div>
                <p>{card.description}</p>
            </div>
        </>
    );
};

export default Card;
