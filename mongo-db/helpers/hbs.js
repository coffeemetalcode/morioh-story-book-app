const moment = require('moment');

module.exports = {
  formatDate: (date, format) => moment(date).utc().format(format),
  truncate: (str, len) => {
    if (str.length > len && str.length > 0) {
      let newStr = `${str} `;
      newStr = str.substr(0, len);
      newStr = str.substr(0, newStr.lastIndexOf(' '));
      newStr = newStr.length > 0 ? newStr : str.substr(0, len);

      return `${newStr}...`;
    }
    return str;
  },
  stripTags: (input) => input.replace(/<(?:.|\n)*?>/gm, ''),
  editIcon: (storyUser, loggedUser, storyId, floating = true) => {
    // eslint-disable-next-line no-underscore-dangle
    if (storyUser._id.toString() === loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
      }
      return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
    }
    return '';
  },
  select: (selected, options) => options
    .fn(this)
    .replace(
      new RegExp(` value="${selected}"`),
      '$& selected="selected"',
    )
    .replace(
      new RegExp(`>${selected}</option>`),
      ' selected="selected"$&',
    ),
};
