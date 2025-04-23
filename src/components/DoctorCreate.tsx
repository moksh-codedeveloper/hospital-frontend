"use client";
import { useState } from 'react';
import { useDoctorStore } from '@/store/doctorStore';
// import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from '@shadcn/ui';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';

const AdminCreateDoctor = () => {
  const [doctorData, setDoctorData] = useState({
    name: '',
    email: '',
    specialisation: '',
    experience: ''
  });
//   const [isModalOpen, setIsModalOpen] = useState(false);
  const { addDoctor } = useDoctorStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoctor(doctorData);
      toast.success('Doctor added successfully!');
    //   setIsModalOpen(false);
      setDoctorData({
        name: '',
        email: '',
        specialisation: '',
        experience: ''
      });
    } catch (error) {
      toast.error('Failed to add doctor.');
      console.error('Error:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">Create Doctor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Doctor</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={doctorData.name} onChange={handleChange} />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" value={doctorData.email} onChange={handleChange} />
          </div>
          <div>
            <Label>Specialisation</Label>
            <Input name="specialisation" value={doctorData.specialisation} onChange={handleChange} />
          </div>
          <div>
            <Label>Experience</Label>
            <Input name="experience" value={doctorData.experience} onChange={handleChange} />
          </div>
        </div>
        <Button onClick={handleSubmit}>Add Doctor</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AdminCreateDoctor;
