$(document).ready(function(){
  ko.applyBindings(new ContributorsViewModel());
})

function ContributorsViewModel() {
  let self = this;
  self.filters = ['all', 'gold', 'silver', 'bronze'];
  self.contributors = ko.observableArray();
  self.chosenFilter = ko.observable('all');
  getContributors().then(function(response) {
    response.forEach(element => {
      let contributor = element;
      contributor.group = element.contributions < 10 ? "bronze": element.contributions < 25 ? "silver": "gold";
      self.contributors.push(contributor);
    });
  })
  self.setFilter = function(filter) {
    self.chosenFilter(filter);
  }
}
async function getContributors(){
  let contributors = await fetch('https://api.github.com/repos/thomasdavis/backbonetutorials/contributors')
  .then(function(response) {
    return response.json();
  });
  return contributors;
}