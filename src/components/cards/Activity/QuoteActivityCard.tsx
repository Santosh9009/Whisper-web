import { timeAgo } from "@/helpers/CalculateTime";
import Image from "next/image";
import Link from "next/link";
import DummyUserIcon from "../../../../public/assests/profile-picture.png";

export default function QuoteActivityCard({ activity }: { activity: any }) {
  return (
    <div className="activity-card quote-activity p-4 rounded-lg mb-4 bg-[#181818] border border-[#2e2e2e]">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={DummyUserIcon}
            alt={activity.actor.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="text-gray-300">
            <Link href={`/profile/${activity.actor._id}`}>
              <a className="font-semibold hover:underline">
                @{activity.actor.username}
              </a>
            </Link>
            <span> quoted your thread</span>
          </div>
          <div className="mt-2 text-gray-500">
            {timeAgo(activity.createdAt)}
          </div>
          {activity.thread && (
            <Link href={`/thread/${activity.thread._id}`}>
              <p className="block mt-3 text-blue-400 hover:underline">
                View Thread
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
