import "../styles.css";

const Content = ({ list, handleCheck, handleDelete, handleEdit }) => {
  const mapList = list.map((x) => (
    <div key={x.id} className="body">
      <li className="flex">
        <input
          type="checkbox"
          onChange={() => handleCheck(x.id)}
          checked={x.checked}
        />
        <label>
          <h3>{x.item}</h3>
        </label>
        <button className="btn" onClick={() => handleDelete(x.id)}>
          X
        </button>
        <button onClick={() => handleEdit(x.id)}>Edit</button>
      </li>
    </div>
  ));
  return (
    <main className="content">
      {list.length ? (
        <ul>{mapList}</ul>
      ) : (
        <h3
          style={{
            marginTop: "2rem",
          }}
        >
          {" "}
          Empty List{" "}
        </h3>
      )}
    </main>
  );
};

export default Content;
