import Image from "next/image";

import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogClose,
} from './ui/dialog';
import harper_logo from './harper_logo.png'
// import { Input } from "./ui/input";
// const TRAITS = [];

export function ControlPanel() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="control-panel">
          <Image
            className="control-panel-img"
            src={harper_logo}
            alt='harper logo'
          />
          Admin
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