"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  ImagePlus,
  LoaderCircle,
  Trash2,
  UserRound,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { apiRequest } from "../../lib/api/client";
import { Button } from "../ui/Button";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: "student" | "tutor" | "admin";
  phone: string | null;
  bio: string;
  plan: "free" | "pro";
}

interface ProfileFormData {
  name: string;
  phone: string;
  bio: string;
}

interface ProfileSettingsProps {
  role: "student" | "tutor" | "admin";
}

export function ProfileSettings({ role }: ProfileSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState<ProfileFormData>({
    name: "",
    phone: "",
    bio: "",
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const response =
          await apiRequest<ProfileData>("/api/users/me");

        if (!cancelled) {
          if (!response.data) {
            throw new Error("Profile data was not returned by the server.");
          }

          setProfile(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Unable to load your profile."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function notifyProfileUpdate(
    updates: { image?: string | null; name?: string }
  ) {
    window.dispatchEvent(
      new CustomEvent("mentorlagbe:profile-updated", {
        detail: updates,
      })
    );
  }

  function startEditing() {
    if (!profile) return;

    setForm({
      name: profile.name,
      phone: profile.phone || "",
      bio: profile.bio || "",
    });

    setFormError("");
    setEditing(true);
  }

  function cancelEditing() {
    if (!profile) return;

    setForm({
      name: profile.name,
      phone: profile.phone || "",
      bio: profile.bio || "",
    });

    setFormError("");
    setEditing(false);
  }

  function updateForm(
    field: keyof ProfileFormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setFormError("");
  }

  async function handleProfileSave(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!profile || saving) return;

    const name = form.name.trim();
    const phone = form.phone.trim();
    const bio = form.bio.trim();

    if (name.length < 2) {
      setFormError("Name must contain at least 2 characters.");
      return;
    }

    if (name.length > 80) {
      setFormError("Name cannot exceed 80 characters.");
      return;
    }

    if (phone.length > 30) {
      setFormError("Phone number cannot exceed 30 characters.");
      return;
    }

    if (bio.length > 500) {
      setFormError("Bio cannot exceed 500 characters.");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const response = await apiRequest<{
        name: string;
        phone: string | null;
        bio: string;
      }>("/api/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          name,
          phone: phone || null,
          bio,
        }),
      });

      const updatedData = response.data;

      if (!updatedData) {
        throw new Error("Updated profile data was not returned.");
      }

      setProfile((current) =>
        current
          ? {
              ...current,
              ...updatedData,
            }
          : current
      );

      setForm({
        name: updatedData.name,
        phone: updatedData.phone || "",
        bio: updatedData.bio,
      });

      setEditing(false);

      notifyProfileUpdate({
        name: updatedData.name,
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to update your profile.";

      setFormError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    event.target.value = "";

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must not exceed 5MB.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const uploadResponse = await apiRequest<{
        imageUrl: string;
      }>("/api/uploads/image", {
        method: "POST",
        body: formData,
      });

      const imageUrl = uploadResponse.data?.imageUrl;

      if (!imageUrl) {
        throw new Error("Image upload did not return a valid image URL.");
      }

      await apiRequest<{ image: string | null }>(
        "/api/users/me/image",
        {
          method: "PATCH",
          body: JSON.stringify({ image: imageUrl }),
        }
      );

      setProfile((current) =>
        current ? { ...current, image: imageUrl } : current
      );

      setPreview("");
      URL.revokeObjectURL(objectUrl);

      notifyProfileUpdate({ image: imageUrl });
      toast.success("Profile image updated successfully.");
    } catch (error) {
      setPreview("");
      URL.revokeObjectURL(objectUrl);

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to upload profile image."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleRemoveImage() {
    if (!profile?.image || removing) return;

    setRemoving(true);

    try {
      await apiRequest<{ image: null }>(
        "/api/users/me/image",
        {
          method: "PATCH",
          body: JSON.stringify({ image: null }),
        }
      );

      setProfile((current) =>
        current ? { ...current, image: null } : current
      );

      setPreview("");
      notifyProfileUpdate({ image: null });

      toast.success("Profile image removed successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to remove profile image."
      );
    } finally {
      setRemoving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <LoaderCircle className="animate-spin text-primary" size={30} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-sm text-muted">
          Unable to load your profile information.
        </p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Try again
        </Button>
      </div>
    );
  }

  const displayedImage = preview || profile.image;

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <div>
        <p className="text-sm font-semibold text-primary">
          Account Settings
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">
          My Profile
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Manage your account information and profile picture.
        </p>
      </div>

      <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
        <div className="border-b border-border px-6 py-5 sm:px-8">
          <h3 className="font-bold text-foreground">
            Profile Picture
          </h3>
          <p className="mt-1 text-sm text-muted">
            Upload a picture to personalize your account.
          </p>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:px-8 sm:py-8">
          <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-secondary bg-secondary text-primary">
            {displayedImage ? (
              <img
                src={displayedImage}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserRound size={48} />
            )}

            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                <LoaderCircle className="animate-spin" size={30} />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-bold text-foreground">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-muted">
              JPG, PNG or WebP. Maximum file size 5MB.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

              <Button
                type="button"
                disabled={uploading || removing}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? (
                  <LoaderCircle className="animate-spin" size={17} />
                ) : (
                  <ImagePlus size={17} />
                )}
                {uploading ? "Uploading..." : "Upload image"}
              </Button>

              {profile.image && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading || removing}
                  onClick={handleRemoveImage}
                >
                  {removing ? (
                    <LoaderCircle className="animate-spin" size={17} />
                  ) : (
                    <Trash2 size={17} />
                  )}
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-3 border-b border-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h3 className="font-bold text-foreground">
              Account Information
            </h3>
            <p className="mt-1 text-sm text-muted">
              Update your personal information.
            </p>
          </div>

          {!editing && (
            <Button type="button" onClick={startEditing}>
              <Pencil size={16} />
              Edit Profile
            </Button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleProfileSave} className="space-y-5 p-6 sm:px-8 sm:py-7">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Full Name
              </label>
              <input
                id="profile-name"
                type="text"
                required
                minLength={2}
                maxLength={80}
                value={form.name}
                onChange={(event) => updateForm("name", event.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="profile-phone"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Phone Number
              </label>
              <input
                id="profile-phone"
                type="tel"
                maxLength={30}
                value={form.phone}
                onChange={(event) => updateForm("phone", event.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="Enter your phone number"
              />
              <p className="mt-1 text-xs text-muted">
                Leave empty if you do not want to add a phone number.
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="profile-bio"
                  className="text-sm font-semibold text-foreground"
                >
                  Bio
                </label>
                <span className="text-xs text-muted">
                  {form.bio.length}/500
                </span>
              </div>
              <textarea
                id="profile-bio"
                rows={4}
                maxLength={500}
                value={form.bio}
                onChange={(event) => updateForm("bio", event.target.value)}
                className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="Write a short introduction about yourself..."
              />
            </div>

            {formError && (
              <p role="alert" className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
                {formError}
              </p>
            )}

            <div className="flex flex-wrap gap-3 border-t border-border pt-5">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <LoaderCircle className="animate-spin" size={17} />
                ) : (
                  <Save size={17} />
                )}
                {saving ? "Saving..." : "Save Changes"}
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={saving}
                onClick={cancelEditing}
              >
                <X size={17} />
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:px-8 sm:py-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Full Name
              </p>
              <p className="mt-2 break-words font-semibold text-foreground">
                {profile.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Email Address
              </p>
              <p className="mt-2 break-words font-semibold text-foreground">
                {profile.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Account Role
              </p>
              <p className="mt-2 font-semibold capitalize text-foreground">
                {profile.role || role}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Subscription Plan
              </p>
              <p className="mt-2 font-semibold uppercase text-foreground">
                {profile.plan}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Phone
              </p>
              <p className="mt-2 font-semibold text-foreground">
                {profile.phone || "Not added"}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Bio
              </p>
              <p className="mt-2 whitespace-pre-wrap break-words font-semibold text-foreground">
                {profile.bio || "No bio added"}
              </p>
            </div>
          </div>
        )}
      </section>

      <p className="flex items-center gap-2 text-xs text-muted">
        <Camera size={15} />
        Profile picture and name changes are reflected across your dashboard.
      </p>
    </div>
  );
}