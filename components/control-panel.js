import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash } from "lucide-react"
import harper_logo from './harper_logo.png'
import { getUserTraits, updateUserTraits } from '@/app/actions';

export async function ControlPanel() {
  const traits = await getUserTraits() || [];
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
          <DialogDescription>Customize user traits and toggle AI functionality</DialogDescription>
          <div>
            <h3>Current Traits</h3>
            <div style={{ fontSize: 14, color: 'gray' }}>
              [
              {traits.map((trait, i) => (
                <span key={`trait-${i}`}>
                  {trait}
                  <Button size="sm" variant="ghost">
                    <Trash className="h-3 w-3" color="red" />
                  </Button>
                  {i === traits.length-1 ? '' : ', '}
                </span>
              ))}
              ]
            </div>
          </div>
          <Input />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}