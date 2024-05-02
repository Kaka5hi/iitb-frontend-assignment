import "./Card.css";

const Card = ({
    card,
    setShowEditModal,
    columnName,
    editCard,
    handleDragEnter,
    handleDragEnd,
}) => {
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
                </div>
                <p>{card.description}</p>
            </div>
        </>
    );
};

export default Card;
