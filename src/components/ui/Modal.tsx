export default function Modal({
  open,
  onClose,
  title,
  children,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
            <h2 className="text-base font-semibold tracking-wide text-neutral-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="btn btn-ghost px-2 py-1"
            >
              ✕
            </button>
          </div>

          <div className="px-5 py-4">{children}</div>

          {actions && (
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-neutral-200">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
