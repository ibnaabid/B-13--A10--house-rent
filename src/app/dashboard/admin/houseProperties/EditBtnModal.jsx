"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Modal,
  Button,
  Input,
  Label,
  TextField,
  Surface,
} from "@heroui/react";
import { Pencil } from "lucide-react";

export default function EditModal({ home, isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  // যখন modal open হবে তখন data set হবে
  useEffect(() => {
    if (home) {
      setFormData({
        title: home.title || "",
        location: home.location || "",
        price: home.price || "",
      });
    }
  }, [home]);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/allhome/${home._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Property updated");
        onSuccess();
        onClose();
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Backdrop />

      <Modal.Container placement="center">
        <Modal.Dialog className="sm:max-w-md">

          {/* Close button */}
          <Modal.CloseTrigger />

          {/* Header */}
          <Modal.Header>
            <div className="flex items-center gap-2">
              <Pencil size={18} className="text-primary" />
              <h2 className="text-lg font-semibold">Edit Property</h2>
            </div>

            <p className="text-sm text-muted mt-1">
              Property information update করুন
            </p>
          </Modal.Header>

          {/* Body */}
          <Modal.Body className="p-6">
            <Surface variant="default">
              <div className="flex flex-col gap-4">

                <TextField name="title" variant="secondary">
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter title"
                  />
                </TextField>

                <TextField name="location" variant="secondary">
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Enter location"
                  />
                </TextField>

                <TextField name="price" variant="secondary">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="Enter price"
                  />
                </TextField>

              </div>
            </Surface>
          </Modal.Body>

          {/* Footer */}
          <Modal.Footer>
            <Button variant="secondary" onPress={onClose}>
              Cancel
            </Button>

            <Button onPress={handleEdit} isLoading={loading}>
              Save Changes
            </Button>
          </Modal.Footer>

        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}