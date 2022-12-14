import { useState, createContext, ReactNode, useContext, useEffect } from 'react';
import RootModal from '~/components/modals';
import FollowerUserModal from '~/components/modals/FollowerUserModal';
import FollowingUserModal from '~/components/modals/FollowingUserModal';
import LikeListModal from '~/components/modals/LikeListModal';
import LogoutModal from '~/components/modals/LogoutModal';
import MessageModal from '~/components/modals/MessageModal';
import NewFriendsModal from '~/components/modals/NewFriendsModal';
import PostActionModal from '~/components/modals/PostActionModal';
import PostModal from '~/components/modals/PostModal';
import SharePostModal from '~/components/modals/SharePostModal';
import UnfollowModal from '~/components/modals/UnfollowModal';
import WarningModal from '~/components/modals/WarningModal';

export const MODAL_TYPES = {
  POST_CREATOR: 'POST_CREATOR',
  POST_ACTION: 'POST_ACTION',
  SHARE_POST: 'SHARE_POST',
  NEW_MESSAGE: 'NEW_MESSAGE',
  RECOMMENDED_FRIENDS: 'RECOMMENDED_FRIENDS',
  WARNING_USER: 'WARNING_USER',
  FOLLOWER_USER: 'FOLLOWER_USER',
  FOLLOWING_USER: 'FOLLOWING_USER',
  LIKE_LIST: 'LIKE_LIST',
  UNFOLLOW: 'UNFOLLOW',
  LOGOUT: 'LOGOUT'
} as const;

export const INPUT_TYPES = {
  UPLOAD: 'UPLOAD',
  STATUS: 'STATUS',
  LOCATION: 'LOCATION'
};
export type ModalType = keyof typeof MODAL_TYPES;

const MODALS = {
  [MODAL_TYPES.POST_CREATOR]: <PostModal key={MODAL_TYPES.POST_CREATOR} />,
  [MODAL_TYPES.POST_ACTION]: <PostActionModal key={MODAL_TYPES.POST_ACTION} />,
  [MODAL_TYPES.SHARE_POST]: <SharePostModal key={MODAL_TYPES.SHARE_POST} />,
  [MODAL_TYPES.NEW_MESSAGE]: <MessageModal key={MODAL_TYPES.NEW_MESSAGE} />,
  [MODAL_TYPES.WARNING_USER]: <WarningModal key={MODAL_TYPES.WARNING_USER} />,
  [MODAL_TYPES.LIKE_LIST]: <LikeListModal key={MODAL_TYPES.LIKE_LIST} />,
  [MODAL_TYPES.UNFOLLOW]: <UnfollowModal key={MODAL_TYPES.UNFOLLOW} />,
  [MODAL_TYPES.LOGOUT]: <LogoutModal key={MODAL_TYPES.LOGOUT} />,
  [MODAL_TYPES.RECOMMENDED_FRIENDS]: <NewFriendsModal key={MODAL_TYPES.RECOMMENDED_FRIENDS} />,
  [MODAL_TYPES.FOLLOWER_USER]: <FollowerUserModal key={MODAL_TYPES.FOLLOWER_USER} />,
  [MODAL_TYPES.FOLLOWING_USER]: <FollowingUserModal key={MODAL_TYPES.FOLLOWING_USER} />
} as const;

interface ModalContextTypes {
  modalsType: ModalType[];
  showModal: (modalType: ModalType) => void;
  hideModal: (modalType: ModalType | ModalType[]) => void;
  checkEmtyInput: (value: string, type: string) => void;
  input: InputValue;
}

interface ModalProviderProp {
  children: ReactNode;
}

interface InputValue {
  upload?: string;
  status?: string;
  location?: string;
}

const ModalContext = createContext<ModalContextTypes>({
  modalsType: [],
  showModal: () => null,
  hideModal: () => null,
  checkEmtyInput: () => null,
  input: {}
});

const ModalProvider = ({ children }: ModalProviderProp) => {
  const [modalTypes, setModalTypes] = useState<ModalType[]>([]);
  const [input, setInput] = useState<InputValue>({
    upload: '',
    status: '',
    location: ''
  });
  const checkEmtyInput = (value: string, type: String) => {
    useEffect(() => {
      switch (type) {
        case INPUT_TYPES.UPLOAD:
          setInput({ ...input, upload: value });
          break;
        case INPUT_TYPES.STATUS:
          setInput({ ...input, status: value });
          break;
        case INPUT_TYPES.LOCATION:
          setInput({ ...input, location: value });
          break;
        default:
          break;
      }
    }, [value, type]);
  };

  const showModal = (modalType: ModalType) => {
    setModalTypes((prev) => [...prev, modalType]);
  };

  const hideModal = (modalType: ModalType | ModalType[]) => {
    if (Array.isArray(modalType)) {
      setModalTypes([]);
    }
    setModalTypes((prev) => prev.filter((modal) => modal !== modalType));
    setInput({
      upload: '',
      status: '',
      location: ''
    });
  };

  const modalsType = [...new Set(modalTypes)];
  return (
    <ModalContext.Provider value={{ modalsType, showModal, hideModal, checkEmtyInput, input }}>
      <RootModal>{modalsType.map((modal) => MODALS[modal])}</RootModal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
