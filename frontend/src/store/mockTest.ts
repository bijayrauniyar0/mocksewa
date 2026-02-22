import { create } from "zustand";

type MockTestStoreType = {
  showReviewsModal: boolean;
  setShowReviewsModal: (show: boolean) => void;
  fullScreen: boolean;
  setFullScreen: (fullScreen: boolean) => void;
};
const MockTestStoreType: MockTestStoreType = {
  showReviewsModal: false,
  setShowReviewsModal: () => {},
  fullScreen: false,
  setFullScreen: () => {},
};
const useMockTestStore = create<MockTestStoreType>((set) => ({
  ...MockTestStoreType,
  setShowReviewsModal: (show) =>
    set(() => ({
      showReviewsModal: show,
    })),
}));

export default useMockTestStore;
