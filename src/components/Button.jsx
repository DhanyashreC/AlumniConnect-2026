export default function Button({ text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "10px 16px",
        backgroundColor: "#4f46e5",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
}