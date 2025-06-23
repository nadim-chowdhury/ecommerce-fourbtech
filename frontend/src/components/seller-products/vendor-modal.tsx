"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_VENDOR_MUTATION_GQL,
  CREATE_VENDOR_MUTATION_GQL,
} from "@/graphql/mutations";
import { MY_VENDOR_QUERY_GQL } from "@/graphql/queries";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

export default function VendorModal({ trigger }: { trigger: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data, loading, refetch } = useQuery(MY_VENDOR_QUERY_GQL);
  const [updateVendor, { loading: updating }] = useMutation(
    UPDATE_VENDOR_MUTATION_GQL
  );
  const [createVendor, { loading: creating }] = useMutation(
    CREATE_VENDOR_MUTATION_GQL
  );
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const hasVendor = !!data?.vendor;
  const vendorName = data?.vendor?.name;

  React.useEffect(() => {
    if (data?.vendor?.name) setName(data.vendor.name);
  }, [data]);

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    try {
      const res = await updateVendor({ variables: { input: { name } } });
      await refetch();
      // Update Redux and localStorage user
      if (data?.vendor) {
        const updatedUser = {
          ...data.vendor,
          vendorId: res.data.updateVendor.id,
          vendor: res.data.updateVendor,
        };
        dispatch(setUser(updatedUser));
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to update vendor");
    }
  };

  const handleCreate = async () => {
    setError(null);
    setSuccess(false);
    try {
      const res = await createVendor({ variables: { input: { name } } });
      await refetch();
      // Update Redux and localStorage user
      if (data?.vendor) {
        const updatedUser = {
          ...data.vendor,
          vendorId: res.data.createVendor.id,
          vendor: res.data.createVendor,
        };
        dispatch(setUser(updatedUser));
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to create vendor");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vendor Profile</DialogTitle>
          <DialogDescription>
            Set or update your vendor name. This will be used for your products.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Vendor Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading || updating || creating}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && (
            <div className="text-green-600 text-sm">
              {hasVendor ? "Vendor updated!" : "Vendor created!"}
            </div>
          )}
        </div>
        <DialogFooter>
          {hasVendor ? (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md"
              onClick={handleSave}
              disabled={updating || !name}
            >
              {updating ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md"
              onClick={handleCreate}
              disabled={creating || !name}
            >
              {creating ? "Creating..." : "Create"}
            </button>
          )}
          <DialogClose asChild>
            <button className="px-4 py-2 border rounded-md" type="button">
              Cancel
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
