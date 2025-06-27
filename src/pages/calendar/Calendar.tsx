import { WeekView } from "@/features/calendar/components/WeekView";
import { useCalendar } from "@/features/calendar/hooks/useCalendar";

function Calendar() {
  const {
    currentDate,
    events,
    handleDateChange,
    handleEventCreate,
    handleEventUpdate,
    handleEventDelete,
  } = useCalendar();

  return (
    <WeekView
      currentDate={currentDate}
      events={events}
      onDateChange={handleDateChange}
      onEventCreate={handleEventCreate}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    />
  );
}

export default Calendar;
