"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowLeft,
  ImagePlus,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { apiRequest } from "../../lib/api/client";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";

const tuitionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters.")
    .max(120, "Title cannot exceed 120 characters."),

  tuitionType: z.enum(["group", "one-to-one"]),

  subject: z
    .string()
    .trim()
    .min(2, "Subject is required.")
    .max(60),

  classLevel: z
    .string()
    .trim()
    .min(2, "Class level is required.")
    .max(60),

  mode: z.enum(["online", "offline"]),

  location: z
    .string()
    .trim()
    .min(2, "Location is required.")
    .max(150),

  monthlyFee: z
    .number()
    .finite()
    .int()
    .min(0, "Monthly fee cannot be negative.")
    .max(1000000, "Monthly fee cannot exceed 1,000,000."),

  daysPerWeek: z
    .number()
    .int()
    .min(1, "Select at least 1 day.")
    .max(7, "Days per week cannot exceed 7."),

  bannerImage: z
    .string()
    .trim()
    .url("Please upload a valid image.")
    .nullable(),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters.")
    .max(3000, "Description cannot exceed 3000 characters."),
});

type TuitionFormValues = z.infer<typeof tuitionSchema>;

interface TuitionDetails {
  _id: string;
  title: string;
  tuitionType: "group" | "one-to-one";
  subject: string;
  classLevel: string;
  mode: "online" | "offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string | null;
  description: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
}

interface TuitionFormProps {
  tuitionId?: string;
}

const defaultValues: TuitionFormValues = {
  title: "",
  tuitionType: "one-to-one",
  subject: "",
  classLevel: "",
  mode: "online",
  location: "",
  monthlyFee: 0,
  daysPerWeek: 5,
  bannerImage: null,
  description: "",
};

const inputClass =
  "h-11 w-full rounded-lg border border-border bg-surface px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

const labelClass =
  "mb-2 block text-sm font-semibold text-foreground";

export default function TuitionForm({
  tuitionId,
}: TuitionFormProps) {
  const router = useRouter();

  const [initialLoading, setInitialLoading] = useState(
    Boolean(tuitionId)
  );

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isEditing = Boolean(tuitionId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<TuitionFormValues>({
    resolver: zodResolver(tuitionSchema),
    defaultValues,
  });

  const currentBanner = watch("bannerImage");

  // Load existing tuition information in edit mode.
  useEffect(() => {
    if (!tuitionId) {
      setInitialLoading(false);
      return;
    }

    let active = true;

    async function loadTuition() {
      try {
        const response = await apiRequest<TuitionDetails>(
          `/api/tuitions/mine/${tuitionId}`
        );

        if (!active || !response.data) return;

        const tuition = response.data;

        reset({
          title: tuition.title,
          tuitionType: tuition.tuitionType,
          subject: tuition.subject,
          classLevel: tuition.classLevel,
          mode: tuition.mode,
          location: tuition.location,
          monthlyFee: tuition.monthlyFee,
          daysPerWeek: tuition.daysPerWeek,
          bannerImage: tuition.bannerImage,
          description: tuition.description,
        });

        setPreviewUrl(tuition.bannerImage);
      } catch (error) {
        if (active) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Unable to load tuition details."
          );

          router.replace("/dashboard/tutor/tuitions");
        }
      } finally {
        if (active) {
          setInitialLoading(false);
        }
      }
    }

    void loadTuition();

    return () => {
      active = false;
    };
  }, [tuitionId, reset, router]);

  // Generate and clean up local image previews.
  useEffect(() => {
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  function handleImageSelection(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, and WebP images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size cannot exceed 5 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
  }

  function removeImage() {
    setSelectedFile(null);
    setPreviewUrl(null);

    setValue("bannerImage", null, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  async function uploadSelectedImage(): Promise<string | null> {
    if (!selectedFile) {
      return currentBanner ?? null;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setUploading(true);

    try {
      const response = await apiRequest<{ imageUrl: string }>(
        "/api/uploads/image",
        {
          method: "POST",
          body: formData,
        }
      );

      const imageUrl = response.data?.imageUrl;

      if (!imageUrl) {
        throw new Error("Image upload did not return an image URL.");
      }

      return imageUrl;
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(values: TuitionFormValues) {
    try {
      const imageUrl = await uploadSelectedImage();

      const payload: TuitionFormValues = {
        ...values,
        bannerImage: imageUrl,
      };

      const endpoint = tuitionId
        ? `/api/tuitions/${tuitionId}`
        : "/api/tuitions";

      await apiRequest(
        endpoint,
        {
          method: tuitionId ? "PATCH" : "POST",
          body: JSON.stringify(payload),
        }
      );

      toast.success(
        tuitionId
          ? "Tuition listing updated successfully. It will require admin review again."
          : "Tuition listing created successfully. It is now pending admin review."
      );

      router.push("/dashboard/tutor/tuitions");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to save tuition listing."
      );
    }
  }

  if (initialLoading) {
    return (
      <Card className="flex min-h-72 items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="mx-auto animate-spin text-primary" size={30} />
          <p className="mt-3 text-sm text-muted">
            Loading tuition details...
          </p>
        </div>
      </Card>
    );
  }

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div>
        <button
          type="button"
          onClick={() => router.push("/dashboard/tutor/tuitions")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to My Tuitions
        </button>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
          Tutor workspace
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-foreground">
          {isEditing ? "Edit Tuition Listing" : "Create Tuition Listing"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted">
          {isEditing
            ? "Update your tuition information. Updated listings will be submitted for admin review again."
            : "Provide accurate details about your tuition opportunity so students can understand your offer."}
        </p>
      </div>

      <Card className="p-5 sm:p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-7"
        >
          <div>
            <h3 className="text-base font-bold text-foreground">
              Basic information
            </h3>
            <p className="mt-1 text-sm text-muted">
              Enter the main details of your tuition.
            </p>
          </div>

          <Input
            label="Tuition title"
            placeholder="Example: Experienced Mathematics Tutor for Class 9–10"
            required
            maxLength={120}
            error={errors.title?.message}
            {...register("title")}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Tuition type <span className="text-danger">*</span>
              </label>
              <select
                className={inputClass}
                {...register("tuitionType")}
              >
                <option value="one-to-one">One-to-one</option>
                <option value="group">Group</option>
              </select>
              {errors.tuitionType && (
                <p className="mt-1 text-xs text-danger">
                  {errors.tuitionType.message}
                </p>
              )}
            </div>

            <Input
              label="Subject"
              placeholder="Example: Mathematics"
              required
              maxLength={60}
              error={errors.subject?.message}
              {...register("subject")}
            />

            <Input
              label="Class / Level"
              placeholder="Example: Class 9–10"
              required
              maxLength={60}
              error={errors.classLevel?.message}
              {...register("classLevel")}
            />

            <div>
              <label className={labelClass}>
                Teaching mode <span className="text-danger">*</span>
              </label>
              <select
                className={inputClass}
                {...register("mode")}
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
              {errors.mode && (
                <p className="mt-1 text-xs text-danger">
                  {errors.mode.message}
                </p>
              )}
            </div>

            <Input
              label="Location"
              placeholder="Example: Chattogram"
              required
              maxLength={150}
              error={errors.location?.message}
              helperText="For online tuition, you can enter your city or preferred area."
              {...register("location")}
            />

            <Input
              label="Monthly fee (BDT)"
              type="number"
              min={0}
              max={1000000}
              step={1}
              required
              error={errors.monthlyFee?.message}
              {...register("monthlyFee", {
                valueAsNumber: true,
              })}
            />

            <Input
              label="Days per week"
              type="number"
              min={1}
              max={7}
              step={1}
              required
              error={errors.daysPerWeek?.message}
              {...register("daysPerWeek", {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-base font-bold text-foreground">
              Tuition banner image
            </h3>
            <p className="mt-1 text-sm text-muted">
              Upload a JPEG, PNG, or WebP image. Maximum size 5 MB.
            </p>

            <div className="mt-4">
              {previewUrl ? (
                <div className="relative overflow-hidden rounded-xl border border-border">
                  <div
                    role="img"
                    aria-label="Tuition banner preview"
                    className="h-52 w-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url("${previewUrl}")`,
                    }}
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                    aria-label="Remove banner image"
                  >
                    <X size={17} />
                  </button>
                </div>
              ) : (
                <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface-secondary/50 px-5 py-8 text-center transition hover:border-primary">
                  <ImagePlus size={32} className="text-primary" />
                  <span className="mt-3 text-sm font-semibold text-foreground">
                    Choose a banner image
                  </span>
                  <span className="mt-1 text-xs text-muted">
                    JPEG, PNG or WebP · Maximum 5 MB
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={handleImageSelection}
                  />
                </label>
              )}

              {previewUrl && (
                <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary hover:underline">
                  <Upload size={15} />
                  Replace image
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={handleImageSelection}
                  />
                </label>
              )}

              {errors.bannerImage && (
                <p className="mt-2 text-xs text-danger">
                  {errors.bannerImage.message}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-base font-bold text-foreground">
              Detailed description
            </h3>
            <p className="mt-1 text-sm text-muted">
              Explain your teaching plan, experience requirements, and other relevant information.
            </p>

            <div className="mt-4">
              <label className={labelClass}>
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                rows={7}
                maxLength={3000}
                placeholder="Describe your tuition opportunity in at least 20 characters..."
                className="w-full resize-y rounded-lg border border-border bg-surface px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
                {...register("description")}
              />
              <div className="mt-1 flex justify-between gap-3">
                {errors.description ? (
                  <p className="text-xs text-danger">
                    {errors.description.message}
                  </p>
                ) : (
                  <p className="text-xs text-muted">
                    Minimum 20 and maximum 3000 characters.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting || uploading}
              onClick={() => router.push("/dashboard/tutor/tuitions")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting || uploading}
              disabled={isSubmitting || uploading}
            >
              {uploading
                ? "Uploading image..."
                : isSubmitting
                  ? "Saving..."
                  : isEditing
                    ? "Save Changes"
                    : "Create Tuition Listing"}
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}