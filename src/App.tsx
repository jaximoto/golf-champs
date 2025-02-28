import ListGroup from "./components/ListGroup";
import Title from "./components/Title";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const items = ["New York", "San Fransisco", "Tokyo", "London"];

  const title = "Golf Champs";
  const HandleSelectedItem = (item: string) => {
    console.log(item);
  };
  return (
    <>
      <Title text={title} />

      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={HandleSelectedItem}
      />
    </>
  );
}
export default App;
