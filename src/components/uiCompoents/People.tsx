import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Peopletabs } from "@/constants";
import LoadFollowers from "../Loadmore/LoadFollowrs";
import LoadFollowings from "../Loadmore/LoadFollowings";

export function People({ userId, btn }: { userId: string; btn: string }) {

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:underline text-slate-400">{btn}</button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[475px] dark bg-[#181818] md:h-[90%] h-[80%] p-0">
        <Tabs defaultValue={btn} className="w-full">
          <TabsList className="flex justify-evenly w-full bg-transparent">
            {Peopletabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab.name}
                className="border-b-[.01rem] border-[#323232] data-[state=active]:text-white data-[state=active]:bg-transparent  data-[state=active]:border-b-2 data-[state=active]:border-b-white w-1/2 rounded-none py-4"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="Followers">
            <LoadFollowers userId={userId} />
          </TabsContent>
          <TabsContent value="Following">
            <LoadFollowings userId={userId} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
