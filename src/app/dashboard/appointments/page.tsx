import AppointmentForm from '@/components/AppointmentForm';
import AppointmentList from '@/components/AppointmentList';

export default function AppointmentsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Appointments</h1>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
}
