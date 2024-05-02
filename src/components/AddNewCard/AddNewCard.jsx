import "./AddNewCard.css";
import {
    IoIosSearch,
    IoIosNotificationsOutline,
    IoIosInformationCircleOutline,
} from "react-icons/io";
import { CiUser } from "react-icons/ci";

const AddNewCard = ({ setShowModal }) => {
    return (
        <nav>
            <div className="left-section">
                <span>Planner board</span>
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <IoIosSearch />
                </div>
            </div>
            <div className="right-section">
                <button onClick={() => setShowModal(true)}>add card</button>
                <IoIosNotificationsOutline />
                <IoIosInformationCircleOutline />
                <CiUser />
            </div>
        </nav>
    );
};

export default AddNewCard;
