"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

const Editwork = ({ home }) => {
    const router = useRouter()
  const [form, setForm] = useState({
    title: home?.title || "",
    location: home?.location || "",
    price: home?.price || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {

      const {data:token} = await authClient.token()


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/allhome/${home._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization : `Bearer ${token.token}`
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      toast.success("successfully update data")
      window.location.reload()
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <Modal>
      {/* OPEN BUTTON */}
      <Button variant="secondary">
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">

            <Modal.CloseTrigger />

            {/* HEADER */}
            <Modal.Header>
              <Modal.Heading>Edit Property</Modal.Heading>
              <p className="mt-1.5 text-sm text-muted">
                Update your property details
              </p>
            </Modal.Header>

            {/* BODY */}
            <Modal.Body className="p-6">
              <Surface>
                <form className="flex flex-col gap-4">

                  {/* TITLE */}
                  <TextField>
                    <Label>Title</Label>
                    <Input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter title"
                    />
                  </TextField>

                  {/* LOCATION */}
                  <TextField>
                    <Label>Location</Label>
                    <Input
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Enter address"
                    />
                  </TextField>

                  {/* PRICE */}
                  <TextField>
                    <Label>Price (TK)</Label>
                    <Input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                    />
                  </TextField>

                </form>
              </Surface>
            </Modal.Body>

            {/* FOOTER */}
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>

              <Button onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default Editwork;