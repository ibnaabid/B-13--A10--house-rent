"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Modal,
  Button,
  Input,
} from "@heroui/react";

export default function RejectModal({ home, isOpen, onClose, onSuccess }) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    if (!reason) {
      toast.error("Please write rejection reason");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/allhome/${home._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "rejected",
            rejectionReason: reason,
          }),
        }
      );

      if (res.ok) {
        toast.success("Property rejected");
        setReason("");
        onSuccess();
        onClose();
      } else {
        toast.error("Reject failed");
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

          <Modal.Header>
            <h2 className="text-lg font-semibold text-rose-500">
              Reject Property
            </h2>
            <p className="text-sm text-muted mt-1">
              Please provide reason for rejection
            </p>
          </Modal.Header>

          <Modal.Body className="p-6">
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Write rejection reason..."
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onPress={onClose}>
              Cancel
            </Button>

            <Button
              color="danger"
              onPress={handleReject}
              isLoading={loading}
            >
              Reject
            </Button>
          </Modal.Footer>

        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}