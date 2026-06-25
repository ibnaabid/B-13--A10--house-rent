import { authClient } from '@/app/lib/auth-client';


const Deletework = ({home}) => {
    const handleDelete = async () => {

      const {data:token} = await authClient.token()
     

  const confirmDelete = confirm("Are you sure?");

  if (!confirmDelete) return;

  const res = await fetch(
    `http://localhost:5000/allhome/${home._id}`,
    {
      method: "DELETE",
      authorization : `Bearer ${token.token}`
    }
  );

  const data = await res.json();

  if (data.deletedCount > 0) {
    alert("Deleted Successfully");
    window.location.reload();
  }
};
    return (
        <div>
            <button
  onClick={() => handleDelete(home._id)}
  className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
>
  Delete
</button>
            
        </div>
    );
};

export default Deletework;