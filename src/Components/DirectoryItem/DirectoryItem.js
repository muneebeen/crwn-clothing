import "./DirectoryItem.scss";

const DirectoryItem = (props) => {
  const { title, id, imageUrl } = props.category;
  return (
    <div key={id} className="DirectoryItem-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};
export default DirectoryItem;
