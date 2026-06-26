"use client";

import { useEffect, useState } from "react";
import { LocateIcon } from "lucide-react";
import Deletebtn from "./Deletebtn";
import EditBtn from "./EditBtn";
// import StatusColumn from "./Feedback";
import PaginationCustomIcons from "@/app/pagination/page";
import ViewFeedbackModal from "./Feedback";
import { authClient } from "@/app/lib/auth-client";

const Property = () => {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data:token} = await authClient.token();
      
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/allhome?page=${page}&limit=${limit}`,

             {headers:
               {
            authorization : `Bearer ${token.token}`
          }

            
          }
        );

        const result = await res.json();

        setData(result.data || []);
        setTotalPages(result.totalPages || 1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          My <span className="text-blue-500">Properties</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Simple property list with pagination
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-slate-900 text-slate-300 text-xs uppercase">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Location</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-slate-800"
                >

                  <td className="p-4">{item.title}</td>

                  <td className="p-4 flex items-center gap-1 text-red-300">
                    <LocateIcon size={16} />
                    {item.location}
                  </td>

                  <td className="p-4 text-green-400 font-semibold">
                    ${item.price}
                  </td>

                  <td className="p-4">
                    <ViewFeedbackModal item={item} />
                  </td>

                  <td className="p-4 flex gap-2">
                    <EditBtn item={item} />
                    <Deletebtn item={item} />
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-4 border-t border-slate-800">
          <PaginationCustomIcons
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </div>

      </div>
    </div>
  );
};

export default Property;