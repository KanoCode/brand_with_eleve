import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateUserForm from "./components/upateUserForm";

const Page = () => {
  return (
    <Card className="w-2/4">
      <CardHeader>
        <CardTitle>Update User Credentials</CardTitle>
        <CardDescription>
          Provide the following to Update the user
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateUserForm />
      </CardContent>
    </Card>
  );
};

export default Page;
