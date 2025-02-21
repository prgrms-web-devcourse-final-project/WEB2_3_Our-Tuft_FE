export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}
