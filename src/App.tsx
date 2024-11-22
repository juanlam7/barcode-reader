import { Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 text-4xl font-bold text-blue-500">
        Welcome to Barcode App
      </h1>
      <Link
        to="/scanner"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Open Barcode Scanner
      </Link>
    </div>
  );
};

export default App;
