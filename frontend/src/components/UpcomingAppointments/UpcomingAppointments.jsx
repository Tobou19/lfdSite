export default function UpcomingAppointments({ appointments }) {
  if (!appointments || appointments.length === 0)
    return <p className="text-gray-500">Aucun rendez-vous à venir.</p>;

  return (
    <div className="h-full p-4 flex flex-col gap-4 bg-white rounded-md shadow-md w-full">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-sm text-gray-600 font-bold">Upcoming Appointments</h1>
        <h1 className="text-sm text-green-600 font-bold cursor-pointer">See all</h1>
      </div>

      {appointments.slice(0, 5).map((appt, index) => {
  const date = new Date(appt.preferredDate);
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const time = new Date(appt.preferredTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const year = date.getFullYear();

  return (
    <div key={index} className="flex items-center gap-4 border-b border-gray-100 pb-2">
      <div className="flex flex-col items-center justify-center gap-1 p-3 bg-violet-100 rounded-md w-20">
        <h1 className="text-xs text-gray-500">{day}</h1>
        <h1 className="text-lg text-violet-600 font-bold">{time}</h1>
        <h1 className="text-xs text-gray-500">{year}</h1>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex justify-center items-center rounded-full w-8 h-8 bg-blue-100">
            <User2Icon className="text-blue-500 w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-700 font-bold">{appt.firstName} {appt.lastName}</h1>
            <h1 className="text-xs text-gray-400">{appt.subject || "Général"}</h1>
          </div>
        </div>

        <h1 className="text-xs text-gray-500">
          {appt.phone || "No phone"} – {date.toLocaleDateString()} {time}
        </h1>

        <button className="mt-2 bg-violet-500 p-1 px-3 rounded-md text-xs text-white font-semibold hover:bg-violet-400 w-max">
          Schedule
        </button>
      </div>
    </div>
  );
})}

    </div>
  );
}
