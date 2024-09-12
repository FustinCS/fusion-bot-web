import { Button } from "../../button";
import { Card } from "../../card";

export default function CrudButtons({setOpen} : {setOpen: (value: boolean) => void}) {
  return (
    <div className="flex justify-center">
      <Card className="flex justify-center border-secondary border-2">
        <Button variant="ghost" onClick={() => {setOpen(true)}}>Add Show</Button>
      </Card>
    </div>
  );
}
