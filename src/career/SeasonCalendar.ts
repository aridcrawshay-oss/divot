export interface Event {
  name: string;
  startDate: Date;
  endDate: Date;
  courseId: string;
  purse: number;
  fieldStrength: number; // 0-100
}

export class SeasonCalendar {
  private year: number;
  private events: Event[] = [];

  constructor(year: number) {
    this.year = year;
    this.generateCollegeSchedule();
  }

  private generateCollegeSchedule(): void {
    // TODO: Create college season events
    // Typically 8-10 events from fall through spring
  }

  getEvents(): Event[] {
    return this.events;
  }

  getYear(): number {
    return this.year;
  }
}
