import Autocomplete from "@/components/Autocomplete";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Autocomplete</h1>
      {
        // TODO: We can improve it by handling fetch logic in parent component and passing data to the Autocomplete.
        //       This method will help us to decouple business logic so we can use Autocomplete with any api requests.
      }
      <Autocomplete placeholder="Search City" onSelect={() => {}} />
    </div>
  );
}

export default App;
