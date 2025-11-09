import React, { useState, useEffect } from "react";
import type { Artwork } from "../../types/Artwork";
import styles from "./ArtForm.module.css";

interface ArtFormProps {
  initialData?: Artwork | null;
  onSubmit?: (data: Artwork) => void;
  onDelete?: (data: Artwork) => void; // optional delete handler
}

export default function ArtForm({
  initialData = null,
  onSubmit,
  onDelete,
}: ArtFormProps) {
  const emptyArt: Artwork = {
    title: "",
    artist: "",
    description: "",
    creationDate: new Date(),
    price: 0,
    dimensions: "",
    imageUrl: "",
    style: "",
    material: "",
    technique: "",
    colorPalette: "",
    artType: "",
    period: "",
  };

  const [formData, setFormData] = useState<Artwork>(initialData || emptyArt);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? Number(value)
          : name === "creationDate"
          ? new Date(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(formData);
  };

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Artist</label>
        <input
          className={styles.input}
          name="artist"
          value={formData.artist}
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
        <label className={styles.label}>Creation Date</label>
        <input
          className={styles.input}
          type="date"
          name="creationDate"
          value={formatDate(formData.creationDate)}
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
        <input
          className={styles.input}
          name="style"
          value={formData.style}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Material</label>
        <input
          className={styles.input}
          name="material"
          value={formData.material}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Technique</label>
        <input
          className={styles.input}
          name="technique"
          value={formData.technique}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Color Palette</label>
        <input
          className={styles.input}
          name="colorPalette"
          value={formData.colorPalette}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Art Type</label>
        <input
          className={styles.input}
          name="artType"
          value={formData.artType}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Period</label>
        <input
          className={styles.input}
          name="period"
          value={formData.period}
          onChange={handleChange}
        />
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
