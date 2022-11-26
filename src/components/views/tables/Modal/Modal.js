import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddForm from "../../addData/AddForm";
import EditForm from "../../addData/EditForm";
import { Container } from "reactstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Example({
  isAddModalOpen,
  onClose,
  isEditModalOpen,
  onClosee, forceUpdate
}) {
  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={isAddModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Container className="fixed inset-0 z-10 overflow-y-auto mt-10">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <Dialog.Title
                    as="button"
                    onClick={onClose}
                    className="text-lg font-medium leading-6 text-gray-900 text-right p-5"
                  >
                    <AiOutlineCloseCircle />
                  </Dialog.Title>
                  <AddForm onClose={onClose} forceUpdate={forceUpdate} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Container>
        </Dialog>
      </Transition.Root>

      {/* edit modal */}
      <Transition.Root show={isEditModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {}}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Container className="fixed inset-0 z-10 overflow-y-auto mt-5">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <Dialog.Title
                    as="button"
                    onClick={onClosee}
                    className="text-lg font-medium leading-6 text-gray-900 text-right p-5"
                  >
                    <AiOutlineCloseCircle />
                  </Dialog.Title>
                  <EditForm onClosee={onClosee} forceUpdate={forceUpdate} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Container>
        </Dialog>
      </Transition.Root>
    </>
  );
}
