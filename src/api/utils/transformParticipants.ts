
import { BOARD_OPTIONS } from '../../data/board'
import type { ParticipantData } from "../../components/BookingBlockComponents/ParticipantCard/ParticipantCard";

export const transformParticipants = (participants: ParticipantData[]) => {
  return participants
    .filter((p) => p.boardId)
    .map((p) => {
      const board = BOARD_OPTIONS.find((b) => b.id === p.boardId);
      return {
        name: p.name || undefined, 
        packId: board?.packId ?? 0,
        instructorHours: p.withInstructor ? p.hours : 0,
      };
    });
};