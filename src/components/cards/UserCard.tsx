import Image from "next/image";
import DummyUserIcon from "../../../public/assests/profile-picture.png";
import { Button } from "../ui/button";
import Link from "next/link";
import Follow from "../uiCompoents/Follow";

interface props {
  username: string;
  name: string;
  followers: any[];
  userId: string | unknown;
  avatarUrl?:string,
}

export default function UserCard({ username, name, followers, userId,avatarUrl }: props) {
  return (
    <>
      <div
        className="flex p-4 bg-transparent"
        // onClick={handleProfileClick}
      >
        <Image
          height={20}
          width={20}
          src={avatarUrl || DummyUserIcon}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="w-full border-b-[.05rem] border-[#323232] pb-2">
          <div className="pl-4 w-full flex justify-between items-center">
            <div className="flex flex-col ">
              <Link href={`/profile/${userId}`}>
                <h2 className="text-base font-semibold text-white hover:underline">
                  @{username}
                </h2>
              </Link>
              <p className="text-gray-400 text-sm">{!name ? "Na" : name}</p>
              <p className="text-white text-sm">
                <span className="mr-2">{followers.length}</span>followers
              </p>
            </div>

            <div className="text-xm">
              <Follow targetId={userId} followers={followers} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
