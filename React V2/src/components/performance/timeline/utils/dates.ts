export function getDatesInRange(start: string, end: string): string[] {
    const dates: string[] = [];
    let current = new Date(start);
    const endDate = new Date(end);
  
    while (current <= endDate) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
  
    return dates;
  }
  
  export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short'
    });
  }