import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function StatusPanel() {
  return (
    <div className="card text-center mt-4">
      <div className="card-body">
        <h5 className="card-title">System Status</h5>
        <p className="card-text text-success fw-bold">Ready ✅</p>
      </div>
    </div>
  );
}
