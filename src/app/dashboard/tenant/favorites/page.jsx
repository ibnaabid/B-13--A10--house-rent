"use client";

import { useEffect, useState } from "react";
import { Table, Button, Checkbox } from "@heroui/react";
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
// import { Icon } from "lucide-react";

export default function FavoritesTable() {
  const [favorites, setFavorites] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set());

  const fetchFavorites = async () => {
    try {
      const res = await fetch("http://localhost:5000/favorites");
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/favorites/${id}`, {
        method: "DELETE",
      });
toast.success("delete favorite")
      setFavorites((prev) => prev.filter((item) => item._id !== id));
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

            {/* ✅ FIX HERE */}
            <Table.Column isRowHeader id="id">
              ID
            </Table.Column>

            <Table.Column id="name">Name</Table.Column>
            <Table.Column id="email">Email</Table.Column>

            <Table.Column className="text-end">
              Actions
            </Table.Column>
          </Table.Header>

          {/* BODY */}
          <Table.Body>
            {favorites.map((item) => (
              <Table.Row key={item._id} id={item._id}>
                <Table.Cell className="pr-0">
                  <Checkbox slot="selection" />
                </Table.Cell>

                <Table.Cell>#{item._id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>

                <Table.Cell>
                  <div className="flex justify-end">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="danger-soft"
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash2Icon className="size-4" icon="lucide:trash" />
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