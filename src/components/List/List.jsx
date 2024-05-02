import "./List.css";
import Card from "../Card/Card";

const List = ({
    item,
    setShowEditModal,
    showEditModal,
    editCard,
    handleDragEnter,
    handleDragEnd,
}) => {
    return (
        <div className="list">
            <h1>{item.type}</h1>
            <div
                className="card-container"
                style={
                    item.cards.length === 0
                        ? { height: "0px", overflow: "hidden", display: "none" }
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
