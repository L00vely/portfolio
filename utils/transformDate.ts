interface MonthAndYear {
  month: string;
  year: number;
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function transformDate(s: string, locale: string = 'en-US'): MonthAndYear {
  // Create a Date object from the provided string
  const date = new Date(s);

  // Get the month and year using toLocaleDateString with the specified locale
  const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
  const dateString = date.toLocaleDateString(locale, options);

  // Split the dateString into an array of [month, year]
  const [month, year] = dateString.split(' ');

  // Capitalize the first letter of the month
  const capitalizedMonth = capitalizeFirstLetter(month);

  // Create and return an object with properties month and year
  const result: MonthAndYear = {
    month: capitalizedMonth,
    year: parseInt(year, 10)
  };

  return result;
}

export { transformDate };
