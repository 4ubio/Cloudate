import { useDispatch, useSelector } from "react-redux"
import { onOpenDateModal, onCloseDateModal } from "../store";

export const useUIStore = () => {
   const {isDateModalOpen} = useSelector(state => state.ui);
   const dispatch = useDispatch();

   const openDateModal = () => dispatch(onOpenDateModal());
   const closeDateModal = () =>  dispatch(onCloseDateModal());
   const toggleDateModal = () => (isDateModalOpen) ? openDateModal() : closeDateModal();
   
   return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
    toggleDateModal
   }
}