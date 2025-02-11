'use client';

import { useState, useEffect } from "react";
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
import { getUserTraits, updateUserTraits } from '../app/actions';

export function ControlPanel() {
  const [traits, setTraits] = useState([]);
  const [traitsReady, setTraitsReady] = useState(null);
  const [traitValue, setTraitValue] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTraitsReady(false);
        const response = await getUserTraits();
        setTraits(response);
        setTraitsReady(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // Call fetchData when the component mounts
    fetchData();
  }, []);

  function handleDeleteTrait(e) {
    const id = e.target.id;
    const arrayIndex = Number(id.split('-')[1]);
    const newTraits = traits.filter((_, i) => i !== arrayIndex);

    // server action - update harper DB
    updateUserTraits("1", newTraits);
    // update state (should be getting successful response from DB)
    setTraits(newTraits);
  }

  function handleTextChange(e) {
    setTraitValue(e.target.value);
  }

  function handleAddTrait() {
    // server action - update harper DB
    updateUserTraits("1", [traitValue, ...traits]);

    // update state (should be getting successful response from DB)
    setTraitValue('');
    setTraits([traitValue, ...traits]);
  }

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
              {traitsReady && traits ? traits.map((trait, i) => (
                <span key={`trait-${i}-${trait}`}>
                  {trait}
                  <Button
                    size="sm"
                    variant="ghost"
                    id={`btntraitid-${i}`}
                    onClick={handleDeleteTrait}
                  >
                    <Trash className="h-3 w-3" color="red" id={`icntraitid-${i}`} />
                  </Button>
                  {i === traits.length-1 ? '' : ', '}
                </span>
              )) : 'Loading'}
              ]
            </div>
          </div>
          <Input onChange={handleTextChange} value={traitValue} />
          <Button size="lg" variant="default" style={{ backgroundColor: '#262626' }} onClick={handleAddTrait}>
            Add Trait
          </Button>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}