import "bootstrap-icons/font/bootstrap-icons.css";

const Loading = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only"></span>
      </div>
      <div className="spinner-grow text-secondary" role="status">
        <span className="sr-only"></span>
      </div>
      <div className="spinner-grow text-success" role="status">
        <span className="sr-only"></span>
      </div>
      <div className="spinner-grow text-danger" role="status">
        <span className="sr-only"></span>
      </div>
      <div className="spinner-grow text-warning" role="status">
        <span className="sr-only"></span>
      </div>
      <div className="spinner-grow text-info" role="status">
        <span className="sr-only"></span>
      </div>
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Loading;
