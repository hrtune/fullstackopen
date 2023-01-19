import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = (props) => {
  const filterHandler = (event) => {
    const filter = event.target.value;
    props.setFilter(filter);
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

export default connect(null, { setFilter })(Filter);
