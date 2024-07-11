"use client";

import { Transition } from "@headlessui/react";
import { useId, useState } from "react";

const Page = () => {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");

  return (
    <>
      <div className="mx-auto my-16 flex max-w-md justify-center">
        <Button onClick={() => setShow(!show)}>Register</Button>
      </div>
      <Transition
        className="mx-auto my-16 max-w-md space-y-4"
        show={show}
        enter="transition-all ease-in-out duration-500 delay-[200ms]"
        enterFrom="opacity-0 translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Input
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Transition>
    </>
  );
};

const Button = ({ children, ...props }: { children: React.ReactNode }) => (
  <button
    className="rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
    {...props}
  >
    {children}
  </button>
);

const Input = ({ label, ...props }: { label: string }) => {
  const inputId = useId();

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <div className="mt-1">
        <input
          type="text"
          id={inputId}
          className="w-full rounded-md border-2"
          {...props}
        />
      </div>
    </div>
  );
};

export default Page;
