import { bookSessionAction } from "@/app/actions";

export function BookingButton({
  sessionId,
  isBooked
}: {
  sessionId: string;
  isBooked: boolean;
}) {
  return (
    <form action={bookSessionAction}>
      <input type="hidden" name="session_id" value={sessionId} />
      <button
        type="submit"
        className={isBooked ? "secondary-btn" : "primary-btn"}
        disabled={isBooked}
      >
        {isBooked ? "\u5df2\u5b8c\u6210\u9810\u7d04" : "\u7acb\u5373\u9810\u7d04"}
      </button>
    </form>
  );
}
