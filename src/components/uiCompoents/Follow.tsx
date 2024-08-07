
import toggleFollowUser from "@/lib/actions/user.actions";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

const Follow=({
  followers,
  targetId,
}: {
  followers: any[];
  targetId: any;
})=> {
  const [isfollowed, setIsfollowed] = useState(false);
  const { data } = useSession();
  const userId = data?.user._id;

  useEffect(() => {
    const result = followers.find((element) => element === userId);
    setIsfollowed(!!result);
  }, [userId]);


  const handlefollow = async () => {
    try{
      const followersarray = await toggleFollowUser(userId,targetId);
      setIsfollowed(!isfollowed);
    }catch(error:any){
      console.log(error.message)
    }
  }

  return (
    <div className="w-1/2">
        <Button onClick={handlefollow} className="w-full dark rounded-xl p-5">
          {isfollowed?"Following":"Follow"}
        </Button>
    </div>
  );
}
export default Follow;