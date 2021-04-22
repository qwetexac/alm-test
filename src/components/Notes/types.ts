export type INote = {
  id: number;
  color: string;
  text: string;
  size: readonly [number, number];
  zIndex: number;
  transform: readonly [number, number];
};
