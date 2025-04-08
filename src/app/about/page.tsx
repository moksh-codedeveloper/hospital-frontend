// app/about/page.tsx
"use client";
export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-6 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mb-6">About Hospital HMS</h1>
      <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
        Hospital HMS is an all-in-one platform designed to simplify and secure
        hospital management. From booking appointments to managing patient profiles,
        we've got it covered. Whether you're a patient or provider, we help you focus
        on what matters most — health.
      </p>
      <div className="mt-10 text-sm text-muted-foreground">
        🚀 Built with Next.js, Zustand, and ❤️ by you.
      </div>
    </main>
  );
}
