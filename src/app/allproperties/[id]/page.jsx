import HomeDetailsCard from "./HomeDetailsCard";

const DynamicPage = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/allhome/${id}`, { cache: "no-store" });
  const data = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      
      <HomeDetailsCard data={data} />
    </div>
  );
};
export default DynamicPage;