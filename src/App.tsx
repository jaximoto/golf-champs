import ListGroup from "./components/ListGroup";
function App() {
  const items = ["New York", "San Fransisco", "Tokyo", "London"];

  const HandleSelectedItem = (item: string) => {
    console.log(item);
  };
  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={HandleSelectedItem}
      />
    </div>
  );
}
export default App;
