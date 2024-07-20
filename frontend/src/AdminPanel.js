import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <>
      <div className="mt-5 d-flex justify-content-center">
        <button type="button" className="btn btn-primary mr-3">
          Update Question List
        </button>
        <Link to={"/updatelanguage"}>
          <button type="button" className="btn btn-primary">
            Update Language List
          </button>
        </Link>
      </div>
    </>
  );
};

export default AdminPanel;
