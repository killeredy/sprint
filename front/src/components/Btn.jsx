export default function Btn({
  bg = "primary",
  color = "white",
  event,
  txt = "ok",
}) {
  return (
    <button className={`btn btn-${bg} text-${color} p-1 px-2`} onclick={event}>
      {txt}
    </button>
  );
}
