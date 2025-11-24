export async function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/appointment")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
        );
        setAppointments(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur récupération rendez-vous :", err);
        setLoading(false);
      });
  }, []);

  return { appointments, loading };
}
