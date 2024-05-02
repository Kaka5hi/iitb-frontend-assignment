import { useEffect, useState } from "react";
import AddNewCard from "./components/AddNewCard/AddNewCard";
import List from "./components/List/List";
import CardModal from "./components/CardModal/CardModal";
import EditCardModal from "./components/EditCardModal/EditCardModal";

const App = () => {
    // for add card modal
    const [showModal, setShowModal] = useState(false);

    // for edit card modal
    const [showEditModal, setShowEditModal] = useState(false);

    // main list data
    const [listData, setListData] = useState(
        JSON.parse(localStorage.getItem("list")) || [
            { type: "pending", key: 1, cards: [] },
            { type: "working", key: 2, cards: [] },
            { type: "completed", key: 3, cards: [] },
        ]
    );

    // drag functionality state, basically tracking which card is picked and from which column
    const [targetCard, setTargetCard] = useState({
        cardId: "",
        columnName: "",
    });

    const handleDragEnd = (cardId, columnName) => {
        let sourceColumnIndex,
            sourceCardIndex,
            targetColumnIndex,
            targetCardIndex;
        // checking inside column
        sourceColumnIndex = listData.findIndex(
            (item) => item.type === columnName
        );
        if (sourceColumnIndex < 0) {
            return;
        }
        // using ColumnIndex to go inside particular column and then check for card index
        sourceCardIndex = listData[sourceColumnIndex].cards.findIndex(
            (item) => item.cardId === cardId
        );
        if (sourceCardIndex < 0) {
            return;
        }
        // similar for target, checking inside column
        targetColumnIndex = listData.findIndex(
            (item) => item.type === targetCard.columnName
        );
        if (targetColumnIndex < 0) {
            return;
        }
        // using ColumnIndex to go inside particular bucket and then check for card index
        targetCardIndex = listData[targetColumnIndex].cards.findIndex(
            (item) => item.cardId === targetCard.cardId
        );
        if (targetCardIndex < 0) {
            return;
        }

        // copy all listdata
        const tempList = [...listData];

        // navigate through the listData for the card and create its copy before deleting it
        const tempCard = tempList[sourceColumnIndex].cards[sourceCardIndex];

        // copy created, than using splice function to delete the card
        tempList[sourceColumnIndex].cards.splice(sourceCardIndex, 1);

        // using target column index and card index we can insert the copy at that posiiton
        tempList[targetColumnIndex].cards.splice(targetCardIndex, 0, tempCard);
        setListData(tempList);
    };

    const handleDragEnter = (cardId, columnName) => {
        setTargetCard({
            cardId,
            columnName,
        });
    };

    // function used to create new card
    const handleNewCardCreation = (data, listType) => {
        const newList = listData.map((item) => {
            if (item.type === listType) {
                const newCardsArr = [...item.cards];
                const { title, description, cardId } = data;
                newCardsArr.push({ title, description, cardId });
                return { ...item, cards: newCardsArr };
            } else {
                return item;
            }
        });
        setListData(newList);
    };

    // function used to deleted card from column
    const deleteCard = (cardId, columnName) => {
        const allCardsFromColum = listData.filter(
            (item) => item.type === columnName
        );
        const filterCardsFromColumn = allCardsFromColum[0].cards.filter(
            (card) => card.cardId !== cardId
        );
        const newList = listData.map((list) => {
            if (list.type === columnName) {
                return { ...list, cards: filterCardsFromColumn };
            } else {
                return list;
            }
        });
        setListData(newList);
        setShowEditModal(false);
    };

    // using this state for editing card data
    const [editData, setEditData] = useState({
        title: "",
        description: "",
        cardId: null,
        columnName: "",
    });

    // function to edit card
    const editCard = (cardDetails) => {
        setEditData(cardDetails);
    };

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(listData));
    }, [listData]);

    return (
        <>
            <AddNewCard setShowModal={setShowModal} />
            <div className="main-container">
                {listData.map((item) => {
                    return (
                        <List
                            key={item.key}
                            item={item}
                            showEditModal={showEditModal}
                            setShowEditModal={setShowEditModal}
                            deleteCard={deleteCard}
                            editCard={editCard}
                            handleDragEnd={handleDragEnd}
                            handleDragEnter={handleDragEnter}
                        />
                    );
                })}
            </div>
            {showModal && (
                <CardModal
                    setShowModal={setShowModal}
                    handleNewCardCreation={handleNewCardCreation}
                    category="new card"
                />
            )}
            {showEditModal && (
                <EditCardModal
                    setShowEditModal={setShowEditModal}
                    editData={editData}
                    setEditData={setEditData}
                    listData={listData}
                    setListData={setListData}
                    deleteCard={deleteCard}
                />
            )}
        </>
    );
};
export default App;
