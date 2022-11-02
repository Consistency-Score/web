import User from "../../types/User";

interface UserListProps {
  items: User[];
}

function ListAllUsers(props: UserListProps) {
  return (
    <ul>
      {props.items.map((user) => {
        return (
          <div key={user.id}>
            {/* <p>{user.id} {user.firstName} {user.lastName}</p> */}
            <p>{user.username} Id: {user.id}</p>
          </div>
        );
      })}
    </ul>
  );
}

export default ListAllUsers;
