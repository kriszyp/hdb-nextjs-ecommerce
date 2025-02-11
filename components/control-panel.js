import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogClose,
} from './ui/dialog';
// import { Input } from "./ui/input";
// const TRAITS = [];

export function ControlPanel() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="control-panel">
          control panel
        </div>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogTitle>Control Panel</DialogTitle>
          TODO: display current user traits
          TODO: add functionality to change user traits
          either from pre-selected list or free form i.e. text
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}