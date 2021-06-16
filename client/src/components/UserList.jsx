import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { followUser } from "../actions/userActions";


const UserList = ({ user }) => {
  // const userFollow = useSelector((state) => state.userFollow);
  // const { success } = userFollow;

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (success) {
  //     window.location.reload()
  //     dispatch({ type: USER_FOLLOW_RESET });
  //   }
  // }, [success, dispatch]);

  const followHandler = () => {
    dispatch(followUser(user._id));
  };

  return (
    <div>
      <ListGroup variant="flush" className="userList" >
        <ListGroup.Item>
          {user.name} <i className="fas fa-times-circle follow-btn"></i>
          <i
            className="fas fa-user-plus follow-btn"
            onClick={followHandler}
          ></i>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default UserList;
