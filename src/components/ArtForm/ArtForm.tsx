import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Artwork } from "../../types/Artwork";
import styles from "./ArtForm.module.css";
import { Style } from "../../data/StyleEnum";
import { Material } from "../../data/MaterialEnum";
import { Technique } from "../../data/TechniqueEnum";
import { ColorPalette } from "../../data/ColorPaletteEnum";
import { ArtType } from "../../data/ArtTypeEnum";
import { Period } from "../../data/PeriodEnum";
import { useRemoveArtwork } from "../../api/Artwork/useRemoveArtwork";
import { useUpdateArtwork } from "../../api/Artwork/useUpdateArtwork";
import { toast } from "react-hot-toast";

interface ArtFormProps {
  initialData?: Artwork | null;
  onSubmit?: (data: Artwork) => void;
  onDelete?: (data: Artwork) => void;
}

export default function ArtForm({
  initialData = null,
  onSubmit,
  onDelete,
}: ArtFormProps) {
  const navigate = useNavigate();
  const { mutate: removeArtwork } = useRemoveArtwork();
  const { mutate: updateArtwork, isPending: isUpdating } = useUpdateArtwork();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const emptyArt: Artwork = {
    name: "",
    author: "",
    description: "",
    price: 0,
    dimensions: "",
    createdAt: new Date(),
    imageUrl: "",
    style: -1,
    material: -1,
    technique: -1,
    colorPalette: -1,
    artType: -1,
    period: -1,
  };

  const [formData, setFormData] = useState<Artwork>(initialData || emptyArt);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "style" ||
        name === "material" ||
        name === "technique" ||
        name === "colorPalette" ||
        name === "artType" ||
        name === "period"
          ? Number(value)
          : value,
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      "name",
      "author",
      "description",
      "price",
      "dimensions",
      "imageUrl",
      "style",
      "material",
      "technique",
      "colorPalette",
      "artType",
      "period",
    ];

    const dropdownFields = [
      "style",
      "material",
      "technique",
      "colorPalette",
      "artType",
      "period",
    ];

    for (const field of requiredFields) {
      const value = formData[field as keyof Artwork];

      if (dropdownFields.includes(field)) {
        if (value === -1 || value === null || value === undefined) {
          return false;
        }
      } else {
        if (
          value === "" ||
          value === null ||
          value === undefined ||
          (field === "price" && value === 0)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (initialData) {
        updateArtwork(formData, {
          onSuccess: () => {
            toast.success("Artwork updated successfully!");
          },
        });
      } else {
        onSubmit?.(formData);
      }
    } else {
      toast.error("Please fill in all the fields");
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    if (formData.id) {
      removeArtwork(formData.id, {
        onSuccess: () => {
          toast.success("Artwork deleted");
          navigate("/Seller-view");
        },
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Author</label>
        <input
          className={styles.input}
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Price</label>
        <input
          className={styles.input}
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="1"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Dimensions</label>
        <input
          className={styles.input}
          name="dimensions"
          value={formData.dimensions}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Image URL</label>
        <input
          className={styles.input}
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Style</label>
        <select
          className={styles.input}
          name="style"
          value={formData.style}
          onChange={handleChange}
        >
          <option value="-1">Select Style</option>
          {Object.entries(Style).map(([key, value]) => (
            <option key={key} value={Number(key)}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Material</label>
        <select
          className={styles.input}
          name="material"
          value={formData.material}
          onChange={handleChange}
        >
          <option value="-1">Select Material</option>
          {Object.entries(Material).map(([key, value]) => (
            <option key={key} value={Number(key)}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Technique</label>
        <select
          className={styles.input}
          name="technique"
          value={formData.technique}
          onChange={handleChange}
        >
          <option value="-1">Select Technique</option>
          {Object.entries(Technique).map(([key, value]) => (
            <option key={key} value={Number(key)}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Color Palette</label>
        <select
          className={styles.input}
          name="colorPalette"
          value={formData.colorPalette}
          onChange={handleChange}
        >
          <option value="-1">Select Color Palette</option>
          {Object.entries(ColorPalette).map(([key, value]) => (
            <option key={key} value={Number(key)}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Art Type</label>
        <select
          className={styles.input}
          name="artType"
          value={formData.artType}
          onChange={handleChange}
        >
          <option value="-1">Select Art Type</option>
          {Object.entries(ArtType).map(([key, value]) => (
            <option key={key} value={Number(key)}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Period</label>
        <select
          className={styles.input}
          name="period"
          value={formData.period}
          onChange={handleChange}
        >
          <option value="-1">Select Period</option>
          {Object.entries(Period).map(([key, value]) => (
            <option key={key} value={Number(key)}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <button className={styles.button} type="submit">
        {initialData ? "Update Artwork" : "Add Artwork"}
      </button>

      {initialData && (
        <>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            Delete Artwork
          </button>
          {showDeleteConfirm && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  minWidth: "300px",
                }}
              >
                <h3>Are you sure?</h3>
                <p>Do you really want to delete this artwork?</p>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={confirmDelete}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </form>
  );
}
