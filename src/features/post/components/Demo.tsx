import * as React from "react"
import dayjs, { Dayjs } from "dayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useScheduleStore } from "../lib/store/dateTime"

export default function TimePickerValue() {
  // Set demo date as initial value - tomorrow at 2:30 PM
  const demoDate = dayjs().add(1, "day").hour(14).minute(30)
  const [value, setValue] = React.useState<Dayjs | null>(demoDate)
  const { setIsScheduled } = useScheduleStore()

  const now = dayjs()
  const currentHour = now.hour()
  const currentMinute = now.minute()

  // Set scheduled state to true initially since we have a demo date
  React.useEffect(() => {
    setIsScheduled(true)
  }, [setIsScheduled])

  // Function to check if selected time is in the past
  const shouldDisableTime = (timeValue: Dayjs, clockType: string) => {
    if (!timeValue) return false

    const selectedHour = timeValue.hour()
    const selectedMinute = timeValue.minute()

    // If it's the same day, disable past times
    if (timeValue.isSame(now, "day")) {
      if (selectedHour < currentHour) {
        return true
      }
      if (selectedHour === currentHour && selectedMinute <= currentMinute) {
        return true
      }
    }

    return false
  }

  const handleTimeChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      setValue(null)
      setIsScheduled(false)
      return
    }

    // Check if the selected time is in the past
    if (
      shouldDisableTime(newValue, "hours") ||
      shouldDisableTime(newValue, "minutes")
    ) {
      // Don't update if it's a past time
      return
    }

    setValue(newValue)
    setIsScheduled(true)

    // You can also update the parent form here if needed
    // setvalue("scheduled_time", newValue.format(), { shouldValidate: true })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={value}
        onChange={handleTimeChange}
        shouldDisableTime={shouldDisableTime}
        minTime={dayjs()
          .hour(currentHour)
          .minute(currentMinute + 1)} // Minimum time is current time + 1 minute
        sx={{
          width: "100%",
          "& .MuiInputBase-root": {
            height: "48px",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            border: "2px solid #000000", // Changed to black
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.2s ease",
            position: "relative",
            "&:hover": {
              borderColor: "#48bb78", // Green hover color
              boxShadow: "0 0 0 1px rgba(72, 187, 120, 0.3)",
            },
            "&.Mui-focused": {
              borderColor: "#48bb78", // Green focus color
              boxShadow: "0 0 0 3px rgba(72, 187, 120, 0.1)",
            },
            "&::before": {
              content: '"🕐"',
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              zIndex: 1,
              pointerEvents: "none",
            },
            "&::after": value
              ? {
                  content: '"✅"',
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                  zIndex: 1,
                  pointerEvents: "none",
                }
              : {},
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiInputBase-input": {
            padding: "0 48px !important",
            textAlign: "left",
            color: "#2d3748",
            "&::placeholder": {
              color: "#a0aec0",
              opacity: 1,
            },
          },
        }}
        slotProps={{
          textField: {
            placeholder: "Select time",
            InputProps: {
              style: {
                paddingLeft: "48px",
                paddingRight: "48px",
              },
            },
          },
          openPickerButton: {
            sx: {
              color: "#48bb78",
              position: "absolute",
              right: "8px",
              "&:hover": {
                backgroundColor: "rgba(72, 187, 120, 0.08)",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  )
}
