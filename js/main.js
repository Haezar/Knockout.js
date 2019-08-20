$(document).ready(function(){
  ko.applyBindings(new ContributorsViewModel());
})

function ContributorsViewModel() {
  let self = this;
  self.filters = ['all', 'gold', 'silver', 'bronze'];
  self.sorters = ['asc', 'desc'];
  self.contributors = ko.observableArray();
  self.chosenFilter = ko.observable('all');
  self.chosenSorting = ko.observable();
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
  self.setSort = function(sort) {
    self.chosenSorting(sort);
    if(sort=="asc"){
      self.contributors(self.contributors().sort(contributorsSortingASC))
    }
    else {
      self.contributors(self.contributors().sort(contributorsSortingDESC))
    }
  }

}
async function getContributors(){
  let contributors = await fetch('https://api.github.com/repos/thomasdavis/backbonetutorials/contributors')
  .then(function(response) {
    return response.json();
  });
  return contributors;
}

function contributorsSortingDESC(firstContributor, secondContributor){
  if (firstContributor.login.toLowerCase() < secondContributor.login.toLowerCase()) {
    return  1
  }
  if (firstContributor.login.toLowerCase() > secondContributor.login.toLowerCase()) {
    return -1
  }
  return 0
}
function contributorsSortingASC(firstContributor, secondContributor){
  if (firstContributor.login.toLowerCase() < secondContributor.login.toLowerCase()) {
    return -1
  }
  if (firstContributor.login.toLowerCase() > secondContributor.login.toLowerCase()) {
    return  1
  }
  return 0
}