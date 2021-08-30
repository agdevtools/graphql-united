const { RESTDataSource } = require('apollo-datasource-rest')

class PlayersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://unitedappapi.herokuapp.com/";
  }


getPlayers() {
         var data = this.get('team/');
	 return data;
  }
}

module.exports = PlayersAPI
