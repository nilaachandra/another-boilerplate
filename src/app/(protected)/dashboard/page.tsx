import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const Dashboard = async () => {
  const session = await auth();
  return <div>
    {JSON.stringify(session)} 
    <form action={async () => {
      "use server"
      await signOut()
    }} className="">
    <Button type="submit">Log Out</Button>

    </form>
    </div>;
};

export default Dashboard;
