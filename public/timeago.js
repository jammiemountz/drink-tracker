/*
 * TODO: one day ago is showing as 2 days ago
*/

function parse(iso8601) {
  let s = iso8601;
  s = s.replace(/\.\d+/, ''); // remove milliseconds
  s = s.replace(/-/, '/').replace(/-/, '/');
  /* eslint-disable */
  s = s.replace(/T/, ' ').replace(/Z/, ' UTC');
  s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400
  s = s.replace(/([\+\-]\d\d)$/, ' $100'); // +09 -> +0900
  /* eslint-enable */
  return new Date(s);
}

const settings = {
  refreshMillis: 60000,
  allowPast: true,
  allowFuture: false,
  localeTitle: false,
  cutoff: 0,
  autoDispose: true,
  strings: {
    prefixAgo: null,
    prefixFromNow: null,
    suffixAgo: 'ago',
    suffixFromNow: 'from now',
    inPast: 'any moment now',
    seconds: 'less than 1 min',
    minute: 'about 1 min',
    minutes: '%d minutes',
    hour: 'about an hr',
    hours: 'about %d hrs',
    day: 'a day',
    days: '%d days',
    month: 'about a month',
    months: '%d months',
    year: 'about a year',
    years: '%d years',
    wordSeparator: ' ',
    numbers: [],
  },
};

function inWords(distanceMillis) {
  const difference = new Date() - distanceMillis;

  const strings = settings.strings;
  const prefix = strings.prefixAgo;
  const suffix = strings.suffixAgo;

  const seconds = Math.abs(difference) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;

  function substitute(stringOrFunction, number) {
    const string = (typeof stringOrFunction === 'function') ? stringOrFunction(number, difference) : stringOrFunction;
    const value = (strings.numbers && strings.numbers[number]) || number;
    return string.replace(/%d/i, value);
  }
  /* eslint-disable */
  const words = seconds < 45 && substitute(strings.seconds, Math.round(seconds)) ||
    seconds < 90 && substitute(strings.minute, 1) ||
    minutes < 45 && substitute(strings.minutes, Math.round(minutes)) ||
    minutes < 90 && substitute(strings.hour, 1) ||
    hours < 24 && substitute(strings.hours, Math.round(hours)) ||
    hours < 42 && substitute(strings.day, 1) ||
    days < 30 && substitute(strings.days, Math.round(days)) ||
    days < 45 && substitute(strings.month, 1) ||
    days < 365 && substitute(strings.months, Math.round(days / 30)) ||
    years < 1.5 && substitute(strings.year, 1) ||
    substitute(strings.years, Math.round(years));
  /* eslint-enable */

  let separator = strings.wordSeparator || '';
  if (strings.wordSeparator === undefined) {
    separator = ' ';
  }
  return [prefix, words, suffix].join(separator);
}

function timeago(timestamp) {
  return inWords(parse(timestamp));
}
