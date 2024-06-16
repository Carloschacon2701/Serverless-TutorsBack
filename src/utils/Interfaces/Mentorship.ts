export interface MentorshipCreation {
  hourly_price: number;
  work_days: number[];
  subject_id: number;
  tutor_id: number;
  currency_id: number;
  userCognito: any;
  capacity: number;
}

export interface DeleteMentorship {
  userCognito: any;
}
