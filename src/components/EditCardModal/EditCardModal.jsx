import React, { useState } from "react";
import "../CardModal/CardModal.css";

const EditCardModal = ({
    setShowEditModal,
    editData,
    setEditData,
    setListData,
    listData,
}) => {
    const [colName, setColName] = useState("");

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedCardValues = {
            title: editData.title,
            description: editData.description,
            oldColumn: editData.colName,
            newColumn: colName,
            cardId: editData.cardId,
        };

        // case 1, where user just updated the title and description and not the column value
        if (updatedCardValues.newColumn === "") {
            // since column value is not updated we will edit update the card
            // find column
            const columnCards = listData.filter(
                (item) => item.type === updatedCardValues.oldColumn
            )[0].cards;

            // update the particular value
            const updatedArr = columnCards.map((item) => {
                if (item.cardId === updatedCardValues.cardId) {
                    const { title, description, cardId } = updatedCardValues;
                    return { title, description, cardId };
                } else {
                    return item;
                }
            });

            // update the whole list based on old column
            const newList = listData.map((list) => {
                if (list.type === updatedCardValues.oldColumn) {
                    return { ...list, cards: updatedArr };
                } else {
                    return list;
                }
            });

            setListData(newList);
            setShowEditModal(false);
        } else if (
            updatedCardValues.newColumn === updatedCardValues.oldColumn
        ) {
            // exceptional case when user changed the column to something new but changed it back to old column value
            // find column
            const columnCards = listData.filter(
                (item) => item.type === updatedCardValues.newColumn
            )[0].cards;

            // update the particular value
            const updatedArr = columnCards.map((item) => {
                if (item.cardId === updatedCardValues.cardId) {
                    const { title, description, cardId } = updatedCardValues;
                    return { title, description, cardId };
                } else {
                    return item;
                }
            });

            // update the whole list based on old column
            const newList = listData.map((list) => {
                if (list.type === updatedCardValues.newColumn) {
                    return { ...list, cards: updatedArr };
                } else {
                    return list;
                }
            });

            setListData(newList);
            setShowEditModal(false);
        } else {
            // user changed the column value to something new

            // find new column
            const columnCards = listData.filter(
                (item) => item.type === updatedCardValues.newColumn
            )[0].cards;

            // push at the last of new column which user selected
            columnCards.push({
                title: updatedCardValues.title,
                description: updatedCardValues.description,
                cardId: updatedCardValues.cardId,
            });

            // update the whole list based on old column
            const newList = listData.map((list) => {
                if (list.type === updatedCardValues.newColumn) {
                    return { ...list, cards: columnCards };
                } else {
                    return list;
                }
            });

            // also delete from the old column since column value changed
            const updatedColumnData = newList.map((item) => {
                if (item.type === updatedCardValues.oldColumn) {
                    const filteredCards = item.cards.filter(
                        (c) => c.cardId !== updatedCardValues.cardId
                    );
                    return { ...item, cards: filteredCards };
                } else {
                    return item;
                }
            });

            setListData(updatedColumnData);
            setShowEditModal(false);
        }
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
                        autoComplete="off"
                        defaultValue={editData.title}
                        onChange={(e) =>
                            setEditData((prev) => {
                                return { ...prev, title: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="description">description:</label>

                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="7"
                        placeholder="enter description"
                        autoComplete="off"
                        defaultValue={editData.description}
                        onChange={(e) =>
                            setEditData((prev) => {
                                return { ...prev, description: e.target.value };
                            })
                        }
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="column">select column:</label>
                    <select
                        id="column"
                        name="column"
                        defaultValue={editData.colName}
                        onChange={(e) => setColName(e.target.value)}
                    >
                        <option
                            value=""
                            defaultValue={editData.colName}
                            disabled
                            hidden
                        >
                            Choose here
                        </option>
                        <option value="pending">pending</option>
                        <option value="working">working</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
                <div className="button-container">
                    <button onClick={() => setShowEditModal(false)}>
                        cancel
                    </button>
                    <button onClick={handleUpdate}>update card</button>
                </div>
            </div>
        </div>
    );
};

export default EditCardModal;
