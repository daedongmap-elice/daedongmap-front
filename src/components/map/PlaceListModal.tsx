import { PlaceInfoCard } from "@/components/map/index";
import { LatLngData, PlaceData } from "@/type/types";

interface PlaceListModalProps {
  openListModal: boolean;
  placeList: PlaceData[];
  userLocation: {
    center: LatLngData;
    errMsg: null | string;
    isLoading: boolean;
  };
}

export default function PlaceListModal({
  openListModal,
  placeList,
  userLocation,
}: PlaceListModalProps) {
  return (
    <div>
      {openListModal && (
        <div className="absolute top-0 z-20 h-[5.3vh] w-full content-center bg-white">
          <img src="svg/logo.svg" alt="로고" className="mx-auto my-0 h-3/5" />
        </div>
      )}
      <div
        className={`fixed z-10 h-[95.3vh] w-full overflow-y-auto bg-[#F7F7F9] pb-5 pt-28 transition-all duration-150 ${openListModal ? "top-0" : "top-[1000px]"}`}
      >
        <div className="relative mx-auto my-0 flex w-[320px] flex-col gap-3">
          {placeList === undefined ? (
            //맛집이 없는 경우 메세지로 알림 추가
            <></>
          ) : (
            placeList.map((place) => {
              return (
                <PlaceInfoCard
                  key={place.id}
                  place={place}
                  userLocation={userLocation}
                  type="main"
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
