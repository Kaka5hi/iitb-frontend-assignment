import "./List.css";
import Card from "../Card/Card";

const List = ({
    item,
    setShowEditModal,
    showEditModal,
    deleteCard,
    editCard,
    handleDragEnter,
    handleDragEnd,
}) => {
    return (
        <div
            className="list"
            style={
                item.cards.length === 0
                    ? { height: "72px", borderRadius: "5px" }
                    : {}
            }
        >
            <h1>{item.type}</h1>
            <div
                className="card-container"
                style={
                    item.cards.length === 0
                        ? { height: "0px", overflow: "hidden" }
                        : {}
                }
            >
                {item.cards?.map((card) => {
                    return (
                        <Card
                            key={card.cardId}
                            card={card}
                            setShowEditModal={setShowEditModal}
                            showEditModal={showEditModal}
                            columnName={item.type}
                            deleteCard={deleteCard}
                            editCard={editCard}
                            handleDragEnd={handleDragEnd}
                            handleDragEnter={handleDragEnter}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default List;
