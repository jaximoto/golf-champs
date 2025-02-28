interface Props {
  text: string;
}
function Title({ text }: Props) {
  return (
    <div className="d-flex justify-content-center fw-bold">
      <h1 className="display-1 p-2 mt-5" style={{ width: "500px" }}>
        {text}
      </h1>
    </div>
  );
}
export default Title;
