import {
  RatingStar,
  ImageInput,
  FindPlaceModal,
} from "@/components/review/index";
import { useState } from "react";
import FormData from "form-data";
import axios from "axios";

const ReviewPost = () => {
  const [previewImgs, setPreviewImgs] = useState<string[]>([]);
  const [postImgs, setPostImgs] = useState<File[]>([]);
  const [tasteRating, setTasteRating] = useState(5);
  const [hygieneRating, setHygieneRating] = useState(5);
  const [kindnessRating, setKindnessRating] = useState(5);
  const [content, setContent] = useState("");

  // TODO: place api와 riview api에 각 데이터 전송 - api수정됨 review에만 요청 보내면 됨
  // TODO: 음식점 선택 모달 띄우고 지도에서 마커 선택 시 정보를 서버로 넘기기
  // TODO: ImageInput에서 이미지 크롭 기능(시간 되면)
  const appendFormData = (formData: FormData) => {
    // 평균 별점 계산
    const sum = tasteRating + hygieneRating + kindnessRating;
    const averageRating = Math.round((sum / 3) * 100) / 100;

    // reviewRequest 데이터 추가
    const reviewRequest = {
      userId: 0,
      content: "본문 내용용요요용",
      tasteRating: tasteRating,
      hygieneRating: hygieneRating,
      kindnessRating: kindnessRating,
      averageRating: averageRating,
    };

    // placeRequest 데이터 추가 (FindPlaceModal 컴포넌트에서 선택된 음식점 정보)
    const placeRequest = {
      kakaoPlaceId: 0,
      placeName: "string",
      placeUrl: "string",
      categoryName: "string",
      addressName: "string",
      roadAddressName: "string",
      phone: "string",
      x: 0,
      y: 0,
    };

    formData.append("file", postImgs);
    // formData.append("reviewRequest", reviewRequest);
    // formData.append("placeRequest", placeRequest);
    formData.append(
      "reviewRequest",
      new Blob([JSON.stringify(reviewRequest)], { type: "application/json" })
    );
    formData.append(
      "placeRequest",
      new Blob([JSON.stringify(placeRequest)], { type: "application/json" })
    );
  };

  const handleSubmit = async () => {
    const formData: FormData = new FormData();
    appendFormData(formData);

    for (const key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    if (previewImgs.length === 0) {
      alert("사진을 1장 이상 첨부해주세요.");
      return;
    }
    if (content === "") {
      alert("본문 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://35.232.243.53:8080/api/reviews",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("응답 데이터:", response.data);
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
    }
  };

  return (
    <div className="pb-16">
      <div className="mb-6 ml-5 mt-4 text-lg font-medium">새 리뷰 등록하기</div>
      <form className="flex flex-col items-center justify-center gap-1">
        <div className="flex justify-center">
          <ImageInput
            previewImgs={previewImgs}
            setPreviewImgs={setPreviewImgs}
            setPostImgs={setPostImgs}
          />
        </div>
        <div className="mt-1 flex flex-col items-center justify-center gap-2 pl-5 pr-5 text-xs">
          <div className="mb-0.5 flex items-center gap-1">
            <span className="min-w-6 text-center">맛</span>
            <RatingStar name="taste" setRating={setTasteRating} />
          </div>
          <div className="mb-0.5 flex items-center gap-1">
            <span className="min-w-6">위생</span>
            <RatingStar name="hygiene" setRating={setHygieneRating} />
          </div>
          <div className="mb-3 flex items-center gap-1">
            <span className="min-w-6">친절</span>
            <RatingStar name="kindness" setRating={setKindnessRating} />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline btn-sm mb-2 w-3/4 max-w-xs flex-col items-baseline border-gray-300 text-xs font-normal"
          // @ts-expect-error NOTE: DaisyUI의 Modal 사용을 위함
          onClick={() => document.getElementById("placeModal").showModal()}
        >
          음식점 선택
        </button>
        <dialog id="placeModal" className="modal modal-bottom">
          <FindPlaceModal />
        </dialog>
        <textarea
          required
          className="textarea textarea-bordered h-32 w-3/4 max-w-xs pt-3 text-xs"
          placeholder="리뷰 내용 입력..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault(); // 기본적인 form submit 동작 방지
            handleSubmit(); // handleSubmit 함수 호출
          }}
          className="btn btn-sm mt-2 w-1/2 bg-mainY font-medium text-YbtnText"
        >
          리뷰 등록
        </button>
      </form>
    </div>
  );
};

export default ReviewPost;
