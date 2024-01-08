interface MonthAndYear {
  month: string;
  year: number;
}

function transformDate(s: string): MonthAndYear {
  // Create a Date object from the provided string
  const date = new Date(s);

  // Array of month names
  const monthNames: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get the month and year
  const month: number = date.getMonth(); // Months range from 0 to 11
  const year: number = date.getFullYear();

  // Create and return an object with properties month and year
  const result: MonthAndYear = {
      month: monthNames[month],
      year: year
  };

  return result;
}

export { transformDate };
