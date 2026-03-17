import {Button} from "@heroui/button";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Input} from "@heroui/input";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure
} from "@heroui/modal";

export function HeroUIExamples() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Buttons Card */}
      <Card className="p-4 shadow-sm border border-default-200">
        <CardHeader className="flex flex-col gap-1 items-start">
          <h4 className="text-xl font-bold">Buttons</h4>
          <p className="text-small text-default-500">Different variants of the HeroUI button component.</p>
        </CardHeader>
        <CardBody className="flex flex-row flex-wrap gap-4 pt-4">
          <Button color="default">Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="danger">Danger</Button>
          <Button variant="bordered" color="primary">Bordered</Button>
          <Button variant="light" color="primary">Light</Button>
          <Button variant="flat" color="primary">Flat</Button>
        </CardBody>
      </Card>

      {/* Input and Modal Card */}
      <Card className="p-4 shadow-sm border border-default-200">
        <CardHeader className="flex flex-col gap-1 items-start">
          <h4 className="text-xl font-bold">Forms & Overlays</h4>
          <p className="text-small text-default-500">Input fields and Modal components.</p>
        </CardHeader>
        <CardBody className="flex flex-col gap-6 pt-4">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input type="email" label="Email" placeholder="Enter your email" />
          </div>

          <Button onPress={onOpen} color="primary" variant="flat">Open Modal</Button>
          
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose: () => void) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p> 
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. 
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </CardBody>
      </Card>

      {/* Featured Card */}
      <Card className="md:col-span-2 shadow-sm border border-default-200">
        <CardHeader className="flex gap-3 px-6 pt-6 pb-2">
          <div className="flex flex-col">
            <p className="text-md font-bold">Next.js Framework</p>
            <p className="text-small text-default-500">hero-ui.com</p>
          </div>
        </CardHeader>
        <CardBody className="px-6 py-4">
          <p>
            Make beautiful websites regardless of your design experience.
            HeroUI is designed to be highly customizable and easy to use.
          </p>
        </CardBody>
        <CardFooter className="px-6 pb-6 pt-2">
          <Button color="primary" variant="solid" className="w-full md:w-auto">
            Get Started Default
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
