import { WeekView } from "@/features/calendar/components/WeekView";
import { useCalendar } from "@/features/calendar/hooks/useCalendar";
import { Helmet } from "react-helmet-async";

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
    <>
      <Helmet>
        <title>Calendar </title>
      </Helmet>
      <WeekView
        currentDate={currentDate}
        events={events}
        onDateChange={handleDateChange}
        onEventCreate={handleEventCreate}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
      />
    </>
  );
}

export default Calendar;
