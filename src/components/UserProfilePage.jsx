import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "../utils/ThemeContext";

function UserProfilePage() {
  const { user } = useAuth0();
  const { theme } = useTheme();
  if (!user) return null;
  return (
    <section
      className={`${
        theme === "dark" && "bg-[#23272F] text-white"
      } w-full min-h-screen px-24 py-24`}
    >
      <div className="w-full border border-white px-6 py-8 flex">
        <div className="flex-shrink bg-red-400 px-12">
          <img src={user.picture} alt={user.name} className="rounded-full" />
        </div>
        <div className="flex-1 bg-green-400 px-12">
          <span className="text-3xl font-bold">{user.name}</span>
        </div>
      </div>
    </section>
  );
}

export default UserProfilePage;
// bg-[#23272F]
