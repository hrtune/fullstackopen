import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const filterHandler = (event) => {
    const filter = event.target.value;
    dispatch(setFilter(filter));
  };
  return (
    <div>
      <p>
        filter
        <input name="filter" type="text" onChange={filterHandler} />
      </p>
    </div>
  );
};

export default Filter;
