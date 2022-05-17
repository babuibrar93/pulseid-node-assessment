module.exports.findMaxByProperty = (data, field) =>
  data.reduce((previous, current) =>
    previous[field] > current[field] ? previous : current
  );
