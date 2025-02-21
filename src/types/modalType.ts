type modalProp = {
  title: string;
  width: string;
  height: string;
  children: React.ReactNode;
};

type modalStore = {
  modal: string | null;
  position?: { x: number; y: number } | null;
  isOpen: (type: string) => void;
  isClose: () => void;
  setPosition?: (val: { x: number; y: number } | null) => void;
};
