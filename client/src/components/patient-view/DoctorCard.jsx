import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Star, BriefcaseMedical } from "lucide-react";

const StarRating = ({ rating = 0, totalStars = 5 }) => {
  const percentage = (rating / totalStars) * 100;
  const starPercentage = `${Math.round(percentage)}%`;

  return (
    <div className="relative" title={`${rating} out of ${totalStars} stars`}>
      <div className="flex">
        {[...Array(totalStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="h-5 w-5 flex-shrink-0 text-gray-300"
          />
        ))}
      </div>
      <div
        className="absolute top-0 left-0 flex overflow-hidden"
        style={{ width: starPercentage }}
      >
        {[...Array(totalStars)].map((_, i) => (
          <Star
            key={`filled-${i}`}
            className="h-5 w-5 flex-shrink-0 text-yellow-400 fill-yellow-400"
          />
        ))}
      </div>
    </div>
  );
};

function DoctorCard({ doctor }) {
  return (
    <div className="flex w-full max-w-sm min-w-[250px] flex-col rounded-xl border bg-card text-card-foreground shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl">
      {/* --- Card Header: Avatar and Main Info --- */}
      <div className="flex items-center gap-4 p-6">
        <Avatar className="h-24 w-24 border-2 border-primary/20">
          <AvatarImage
            src={doctor?.user.avatar.url}
            alt={doctor?.user.fullName}
          />
          <AvatarFallback className="text-3xl font-semibold">
            {doctor?.user.fullName}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">
            {doctor?.user.fullName}
          </h2>
        </div>
      </div>
      <div className=" text-center mb-2">
        {doctor?.specializations.join(" , ")}
      </div>

      <hr />

      <div className="flex justify-around py-4 text-center">
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold leading-none">
              {doctor?.averageRating.toFixed(1)}
            </span>
            <StarRating rating={doctor?.averageRating} />
          </div>
          <span className="text-sm text-muted-foreground">Rating</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-xl font-bold flex items-center gap-1.5">
            <BriefcaseMedical className="h-5 w-5 text-primary" />
            {doctor?.experienceInYears}+
          </span>
          <span className="text-sm text-muted-foreground">Years Exp.</span>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
