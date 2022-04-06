import SearchPage from "./pages/Search";
import './App.css';
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div>
        <SearchPage />
      </div>
    </Provider>
  );
}

export default App;
