export interface CalendarEventInput {
  title: string;
  description?: string;
  location?: string;
  startDateTime: string;
  endDateTime: string;
}

function formatIcsDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function downloadIcsFile(event: CalendarEventInput) {
  const start = formatIcsDate(event.startDateTime);
  const end = formatIcsDate(event.endDateTime);
  const now = formatIcsDate(new Date().toISOString());

  const cleanText = (text?: string) =>
    (text || '').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//God Movement e.V.//Resurrection Family Church//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${now}-${Math.random().toString(36).substring(2, 9)}@godmovement.tv`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${cleanText(event.title)}`,
    `DESCRIPTION:${cleanText(event.description)}`,
    `LOCATION:${cleanText(event.location)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}