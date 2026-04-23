export interface ICSOptions {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
  url?: string;
}

export function generateICS(options: ICSOptions) {
  const { title, description, location, start, end, url } = options;

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Super-E Luxury Commerce//Booking Engine//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@supere.luxury`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(start)}`,
    `DTEND:${formatDate(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}${url ? `\\n\\nView Booking: ${url}` : ""}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `${title.replace(/\s+/g, "_")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
