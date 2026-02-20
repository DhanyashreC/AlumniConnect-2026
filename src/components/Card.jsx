export default function Card({ title, value }) {
  return (
    <div style={{
      padding: "16px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      margin: "10px"
    }}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}