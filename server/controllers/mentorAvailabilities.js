const airtable = require("../airtable/airtable_helpers");

exports.getMentors = (req, res) => {
  airtable
    .getMentors()
    .then(mentors => {
      res.send(JSON.stringify(mentors));
    })
    .catch(console.log);
};

exports.getAvailabilities = (req, res) => {
  const { mentor } = req.query;
  airtable
    .filterAvailabilities(mentor)
    .then(availabilityObj => {
      if (availabilityObj === []) {
        return res.send("none");
      } else {
        res.send(JSON.stringify(availabilityObj));
      }
    })
    .catch(console.log);
};
