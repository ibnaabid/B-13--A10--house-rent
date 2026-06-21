"use client";

import { useEffect, useState } from "react";
import { Table, Button, Checkbox } from "@heroui/react";
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@/app/lib/auth-client";

export default function FavoritesTable() {
  const [favorites, setFavorites] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  
  const { data: session } = useSession(); 
  const userId = session?.user?.id; 

  // ফেভারিট ডেটা লোড করার ফাংশন
  const fetchFavorites = async ({userId}) => {
    if (!userId) return; 
    
    try {
      const res = await fetch(`http://localhost:5000/favorites/${userId}`);
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // যখনই userId পাওয়া যাবে, তখনই ডেটা ফেচ হবে
  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  // ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/favorites/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        toast.success("Deleted from favorites");
        setFavorites((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Favorites Table"
          className="min-w-[700px]"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {/* HEADER */}
          <Table.Header>
            <Table.Column className="pr-0">
              <Checkbox slot="selection" aria-label="Select all" />
            </Table.Column>
            <Table.Column isRowHeader id="id">ID</Table.Column>
            <Table.Column id="title">Title</Table.Column> {/* 👈 আপনার রিকোয়েস্ট অনুযায়ী title কলাম */}
            <Table.Column id="name">Name</Table.Column>
            <Table.Column className="text-end">Actions</Table.Column>
          </Table.Header>

          {/* BODY */}
          <Table.Body>
            {favorites.map((item) => (
              <Table.Row key={item._id} id={item._id}>
                <Table.Cell className="pr-0">
                  <Checkbox slot="selection" />
                </Table.Cell>
                <Table.Cell>#{item._id?.slice(-6)}</Table.Cell> {/* আইডি ছোট করে দেখানোর জন্য */}
                <Table.Cell>{item.title}</Table.Cell> {/* 👈 ব্যাকএন্ডের title শো করবে */}
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  <div className="flex justify-end">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="danger-soft"
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}