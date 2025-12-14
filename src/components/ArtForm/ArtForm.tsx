import React, { useState, useEffect } from "react";
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
  const { mutate: removeArtwork } = useRemoveArtwork();
  const { mutate: updateArtwork, isPending: isUpdating } = useUpdateArtwork();
  const [successMessage, setSuccessMessage] = useState<string>("");

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
            setSuccessMessage("Artwork updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
          },
        });
      } else {
        onSubmit?.(formData);
      }
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleDelete = () => {
    if (formData.id) {
      removeArtwork(formData.id);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {successMessage && (
        <div
          style={{
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#d4edda",
            color: "#155724",
            borderRadius: "4px",
          }}
        >
          {successMessage}
        </div>
      )}
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Author</label>
        <input
          className={styles.input}
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <textarea
          className={styles.textarea}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
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
          required
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
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Image URL</label>
        <input
          className={styles.input}
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Style</label>
        <select
          className={styles.input}
          name="style"
          value={formData.style}
          onChange={handleChange}
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          Delete Artwork
        </button>
      )}
    </form>
  );
}
