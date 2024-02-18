export default function BtnOutline({ line = "primary", onClick, txt = "ok" }) {
  const handleAction = (e) => {
    onClick(e);
  };
  return (
    <button
      className={`btn btn-outline-${line} p-1 px-2`}
      onClick={(e) => handleAction(e)}
    >
      {txt}
    </button>
  );
}
