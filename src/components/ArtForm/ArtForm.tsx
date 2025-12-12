import React, { useState, useEffect } from "react";
import type { Artwork } from "../../types/Artwork";
import styles from "./ArtForm.module.css";

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
  const emptyArt: Artwork = {
    name: "",
    author: "",
    description: "",
    price: 0,
    dimensions: "",
    imageUrl: "",
    style: 0,
    material: 0,
    technique: 0,
    colorPalette: 0,
    artType: 0,
    period: 0,
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

    for (const field of requiredFields) {
      const value = formData[field as keyof Artwork];
      if (
        value === "" ||
        value === 0 ||
        value === null ||
        value === undefined
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleDelete = () => {
    if (onDelete) onDelete(formData);
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
          <option value="0">Select Style</option>
          <option value="1">Realistic</option>
          <option value="2">Abstract</option>
          <option value="3">Impressionist</option>
          <option value="4">Surreal</option>
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
          <option value="0">Select Material</option>
          <option value="1">Oil</option>
          <option value="2">Acrylic</option>
          <option value="3">Watercolor</option>
          <option value="4">Canvas</option>
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
          <option value="0">Select Technique</option>
          <option value="1">Brushwork</option>
          <option value="2">Layering</option>
          <option value="3">Glazing</option>
          <option value="4">Impasto</option>
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
          <option value="0">Select Color Palette</option>
          <option value="1">Warm</option>
          <option value="2">Cool</option>
          <option value="3">Neutral</option>
          <option value="4">Vibrant</option>
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
          <option value="0">Select Art Type</option>
          <option value="1">Painting</option>
          <option value="2">Sculpture</option>
          <option value="3">Drawing</option>
          <option value="4">Photography</option>
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
          <option value="0">Select Period</option>
          <option value="1">Contemporary</option>
          <option value="2">Modern</option>
          <option value="3">Renaissance</option>
          <option value="4">Classical</option>
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
