import style from "./ConfirmModal.module.css";

type ConfirmModalProps = {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmModal({
  title = "Confirm action",
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className={style.backdrop}>
      <div className={style.modal}>
        <h3>{title}</h3>
        <p>{message}</p>

        <div className={style.actions}>
          <button className={style.cancel} onClick={onCancel}>
            Cancel
          </button>
          <button className={style.confirm} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
