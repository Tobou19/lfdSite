import { PersonStanding, User, User2Icon, Pencil, Trash2, Plus } from "lucide-react";

export default function ManageDashbord() {
  const team = [
    { id: 1, name: "Dr. Alice Smith", role: "Cardiologist", img: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Dr. John Doe", role: "Therapist", img: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Dr. Sarah Connor", role: "Neurologist", img: "https://i.pravatar.cc/150?img=3" },
  ];

  return (
    <div className="flex p-4 h-screen flex flex-col gap-2">
      {/* Header */}
      <h1 className="text-xl font-bold text-gray-800 mb-6">Good day!</h1>

      {/* Rapport */}
      <div className="flex gap-2">
        {/* Upcoming Appointment */}
        <div
          className="h-40 p-3 flex flex-col gap-3 justify-evenly"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "50%",
          }}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-sm text-gray-600 font-bold">
              Upcoming Appointment
            </h1>
            <h1 className="text-sm text-green-600 font-bold">See all</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center justify-center gap-1 p-6 size-20 bg-violet-100 rounded-md">
              <h1 className="text-sm text-gray-500 ">sunday</h1>
              <h1 className="text-lg text-violet-600 font-bold">12:00</h1>
              <h1 className="text-xs text-gray-500">2025</h1>
            </div>

            <div className="flex flex-col items-left justify-start">
              {/* Appointment details */}
              <div className="flex items-center gap-2">
                <div className="flex justify-center items-center rounded-full size-10 bg-blue-100">
                  <User2Icon className="text-blue-500 size-5" />
                </div>
                <div className="flex flex-col items-left justify-start">
                  <h1 className="text-md text-gray-500 font-bold">
                    Dr. John Doe
                  </h1>
                  <h1 className="text-xs text-gray-300">
                    Therapist, Cardiologist
                  </h1>
                </div>
              </div>

              <h1 className="text-sm text-gray-400 font-bold">
                Douala Cameroun, Matin - 12:00
              </h1>

              <button className="mt-2 bg-violet-500 p-1 px-4 rounded-md m-4 text-md text-gray-200 font-bold hover:bg-violet-400">
                Schedule with Dr
              </button>
            </div>
          </div>
        </div>

        {/* Action */}
        <div
          className="flex gap-3 justify-evenly h-auto"
          style={{ width: "50%" }}
        >
          <div
            style={{ width: "50%" }}
            className="flex items-left flex-col justify-start w-1/2 h-full bg-white p-3 rounded-md gap-2 h-40"
          >
            <h1 className="text-sm text-gray-600 font-bold">Action</h1>
            <div
              className="bg-green-100 p-2 px-4 rounded-md flex items-center gap-1"
              style={{ width: "110px" }}
            >
              <div className="size-2 rounded-full bg-green-500"> </div>
              <div className="text-xs text-green-500 font-bold">
                Beneficiary
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Doctor consultaion requiered
            </p>
            <button className="mt-2 bg-green-500 p-1 px-4 rounded-md m-4 text-md text-gray-200 font-bold hover:bg-green-400">
              Schedule with Dr
            </button>
          </div>
          <div
            style={{ width: "50%" }}
            className="flex items-left flex-col justify-start w-1/2 h-full bg-white p-3 rounded-md gap-2 h-40"
          >
            <h1 className="text-sm text-gray-600 font-bold">Action</h1>
            <div
              className="bg-green-100 p-2 px-4 rounded-md flex items-center gap-1"
              style={{ width: "110px" }}
            >
              <div className="size-2 rounded-full bg-green-500"> </div>
              <div className="text-xs text-green-500 font-bold">
                Beneficiary
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Doctor consultaion requiered
            </p>
            <button className="mt-2 bg-white border border-green-500 p-1 px-4 rounded-md m-4 text-md text-green-500 font-bold hover:bg-green-300 hover:text-white">
              Schedule with Dr
            </button>
          </div>
        </div>
      </div>

      {/* Gestion d’équipe */}
      <div className="bg-white rounded-md shadow-sm p-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-700">Gestion de l’équipe</h2>
          <button className="flex items-center gap-1 bg-violet-500 text-white px-3 py-1 rounded-md text-sm hover:bg-violet-400">
            <Plus className="w-4 h-4" /> Ajouter un membre
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-md hover:shadow-md transition"
            >
              <img
                src={member.img}
                alt={member.name}
                className="h-16 w-16 rounded-full object-cover mb-2"
              />
              <h3 className="text-md font-semibold text-gray-800">{member.name}</h3>
              <p className="text-xs text-gray-500">{member.role}</p>

              <div className="flex gap-2 mt-2">
                <button className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                  <Pencil className="w-3 h-3" /> Éditer
                </button>
                <button className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200">
                  <Trash2 className="w-3 h-3" /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cases vides (tes deux divs) */}
      <div className="flex gap-2 mt-4">
        <div className="w-1/2 h-auto bg-white p-3 rounded-md"></div>
        <div className="w-1/2 h-auto bg-white p-3 rounded-md"></div>
      </div>
    </div>
  );
}
