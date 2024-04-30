import { UserInfo } from "@/type/types";

interface MypageProps {
  profile: UserInfo;
}

const MyPagePresent: React.FC<MypageProps> = ({ profile }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mt-16 flex flex-row">
          <div className="avatar mr-4">
            <div className="w-23 rounded-full border border-solid  border-subGray">
              <img src="img/profile.jpg" alt="프로필 이미지 " />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-2xl font-semibold">{profile.nickName}</span>
            <div>
              <span className="text-xs text-subGray">게시글</span>
              <span className="text-xs">10</span>
            </div>
            <span className="text-sm">{profile.status}</span>
          </div>
        </div>
        <button className="btn btn-sm mt-[30px] w-[280px] bg-mainG text-GbtnText">
          <a href="/editprofile">프로필 편집</a>
        </button>
        <hr className="mt-5 w-10/12 border-t border-solid border-subLightGray" />
      </div>
    </>
  );
};

export default MyPagePresent;
