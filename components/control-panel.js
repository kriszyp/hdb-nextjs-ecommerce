import Image from "next/image";

import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './ui/dialog';
import harper_logo from './harper_logo.png'
import { getUserTraits } from '@/app/actions';
// import { Input } from "./ui/input";

export async function ControlPanel() {
  const traits = await getUserTraits() || [];
  console.log('traits ', traits);

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
          <DialogTitle>Demo Admin Panel</DialogTitle>
          {/* <DialogDescription>View & edit current user traits</DialogDescription> */}
          <div>
            <h3>Current Traits</h3>
            <div style={{ fontSize: 14, color: 'gray' }}>
              [
              {traits.map((trait, i) => (
                <span key={`trait-${i}`}>{trait}{i === traits.length-1 ? '' : ', '}</span>
              ))}
              ]
            </div>
          </div>
          TODO: add functionality to change user traits
          either from pre-selected list or free form i.e. text
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}