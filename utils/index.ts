export const formatWithDay = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // hiển thị thứ (Monday, Tuesday...)
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  // Format theo Vietnamese
  return date.toLocaleDateString('vi-VN', options);
};

export enum ENUM_STATUS_ATTENDANCE {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export const TITLE_STATUS_ATTENDANCE = {
  [ENUM_STATUS_ATTENDANCE.ACCEPTED]: 'Đồng ý',
  [ENUM_STATUS_ATTENDANCE.REJECTED]: 'Không tham gia',
};
