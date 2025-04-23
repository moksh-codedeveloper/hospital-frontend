import { useEffect, useState } from 'react';
import { useDoctorStore } from '@/store/doctorStore';
import { Table, TableHeader, TableBody, TableRow, TableCell } from './ui/table';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { toast } from 'sonner';

const AdminFetchDoctors = () => {
  const { doctors, fetchDoctors, deleteDoctor } = useDoctorStore();
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  useEffect(() => {
    if (doctors.length === 0) {
      setOpenAlert(true);
    }
  }, [doctors]);

  const handleDeleteDoctor = async (doctorId: string) => {
    try {
      await deleteDoctor(doctorId);
      toast.success('Doctor deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete doctor.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Doctors List</h2>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>No Doctors Available</AlertDialogTitle>
            <AlertDialogDescription>
              There are currently no doctors added to the system. Please create one to proceed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setOpenAlert(false)}>Okay</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {doctors.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Specialisation</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.specialisation}</TableCell>
                <TableCell>{doctor.experience}</TableCell>
                <TableCell>
                  <Button onClick={() => console.log(doctor)} className="mr-2">
                    View
                  </Button>
                  <Button onClick={() => handleDeleteDoctor(doctor._id!)} variant="destructive">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminFetchDoctors;
