import { authClient } from '@/app/lib/auth-client';
import toast from 'react-hot-toast';
// import { headers } from 'next/headers';


const Deletework = ({home}) => {
    const handleDelete = async () => {

      const {data:token} = await authClient.token()
     

  const confirmDelete = confirm("Are you sure?");

  if (!confirmDelete) return;

  const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/allhome/${home._id}`,
  {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token.token}`
    }
  }
);

  const data = await res.json();

  if (data.deletedCount > 0) {
    toast.success("Deleted Successfully");
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